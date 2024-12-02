import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  city?: string
  country?: string
  contactPurpose: string
  message: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const formData: ContactFormData = await req.json()
    console.log('Received contact form submission:', formData)

    // Insert into general_inquiries table
    const { error: insertError } = await supabaseClient
      .from('general_inquiries')
      .insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          country: formData.country,
          contact_purpose: formData.contactPurpose,
          message: formData.message,
        },
      ])

    if (insertError) {
      console.error('Error inserting inquiry:', insertError)
      throw insertError
    }

    // Create a notification
    const { error: notificationError } = await supabaseClient
      .from('notifications')
      .insert([
        {
          title: 'New Contact Form Submission',
          message: `New inquiry from ${formData.firstName} ${formData.lastName}`,
          icon: 'mail',
          start_date: new Date().toISOString(),
          expire_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        },
      ])

    if (notificationError) {
      console.error('Error creating notification:', notificationError)
      // Don't throw here, continue with email sending
    }

    // Fetch email templates
    const { data: templates, error: templateError } = await supabaseClient
      .from('email_templates')
      .select('*')
      .in('type', ['contact_form_confirmation', 'general_inquiry_notification'])

    if (templateError) {
      console.error('Error fetching email templates:', templateError)
      throw templateError
    }

    const confirmationTemplate = templates.find(t => t.type === 'contact_form_confirmation')
    const notificationTemplate = templates.find(t => t.type === 'general_inquiry_notification')

    if (!confirmationTemplate || !notificationTemplate) {
      throw new Error('Email templates not found')
    }

    // Replace variables in confirmation email
    let confirmationHtml = confirmationTemplate.html_content
      .replace('{{firstName}}', formData.firstName)
      .replace(/{{courseUrl}}/g, 'https://yourwebsite.com')

    // Replace variables in notification email
    let notificationHtml = notificationTemplate.html_content
      .replace('{{firstName}}', formData.firstName)
      .replace('{{lastName}}', formData.lastName)
      .replace('{{email}}', formData.email)
      .replace('{{phone}}', formData.phone || 'Not provided')
      .replace('{{purpose}}', formData.contactPurpose)
      .replace('{{message}}', formData.message)

    // Send confirmation email to user
    const confirmationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Crypto Trading <noreply@yourwebsite.com>',
        to: formData.email,
        subject: confirmationTemplate.subject,
        html: confirmationHtml,
      }),
    })

    if (!confirmationResponse.ok) {
      console.error('Error sending confirmation email:', await confirmationResponse.text())
      throw new Error('Failed to send confirmation email')
    }

    // Send notification email to admin
    const notificationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Crypto Trading <noreply@yourwebsite.com>',
        to: 'admin@yourwebsite.com', // Replace with actual admin email
        subject: notificationTemplate.subject,
        html: notificationHtml,
      }),
    })

    if (!notificationResponse.ok) {
      console.error('Error sending notification email:', await notificationResponse.text())
      // Don't throw here, the user's email was sent successfully
    }

    return new Response(
      JSON.stringify({ message: 'Contact form submitted successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process contact form' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})