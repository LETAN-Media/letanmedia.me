export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    
    // Server-side securely holds the password. It is NEVER sent to the client.
    const emailPayload = {
      SecureToken: null,
      Host: "smtp.gmail.com",
      Username: "tcmedia.copyright@gmail.com",
      Password: "ufjt xwub knjo qmmj",
      To: "tcmedia.copyright@gmail.com",
      From: "tcmedia.copyright@gmail.com",
      Subject: "Liên hệ mới từ " + (data.fullname || 'Khách hàng'),
      Body: `<h3>Có một liên hệ mới từ Website LETAN Media</h3>
             <p><strong>Họ tên:</strong> ${data.fullname || 'Không có'}</p>
             <p><strong>SĐT:</strong> ${data.phone || 'Không có'}</p>
             <p><strong>Gói dịch vụ:</strong> ${data.service || 'Không chọn'}</p>
             <p><strong>Ghi chú:</strong> ${data.content || 'Không có'}</p>`,
      Action: "Send",
      nocache: Math.floor(1e6 * Math.random() + 1)
    };

    const response = await fetch("https://smtpjs.com/v3/smtpjs.aspx?", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(emailPayload)
    });
    
    const text = await response.text();
    return new Response(JSON.stringify({ status: text === "OK", message: text }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ status: false, message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
