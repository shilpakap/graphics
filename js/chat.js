	<script>
		
$(document).ready(function () {
    var i = new Image(); $('.open-btn').show(); $('.close-btn').hide(); if (!checkCookie("Chat_visible")) {
        $(i).load(function ()
        { $('.chat').animate({ 'right': '0px' }, 1500); $('.close-btn').show(); $('.open-btn').hide() })
    }
    i.src = '/wp-content/themes/mototheme/images/chat-bg.png'; $('.open-btn').click(openChat); $('.close-btn').click(closeChat); $('#chat_email').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which); if (validEmail($(this).val()))
        { $(this).css({ 'border': '1px solid #325600' }) }
        if (keycode == '13')
        { getHref() }
    }); $('#lounch_chat').click(getHref)
}); function sendOfflineMessage() {
    var mail = ($('#chat_email').val() == 'Email: (required)' || $('#chat_email').val() == '') ? '' : $('#chat_email').val(); if (!validEmail(mail))
    { $('#chat_email').css('border-color', 'red') }
    else {
        var name = ($('#chat_name').val() == 'Name:' || $('#chat_name').val() == '') ? 'Guest' : $('#chat_name').val(); if ($('#chat_offline_message').val() == 'Message: (required)' || $('#chat_offline_message').val() == '')
        { $('#chat_offline_message').css({ 'border': '1px solid #FF0000' }) }
        else {
            $('#chat_offline_message').css({ 'border': '1px solid #325600' }); if ($('#chat_name').val() == 'Name:') $('#chat_name').val(""); $('.third_p').text("Processing your request, please wait..."); $('#send_offline_message').hide(); $.ajax({
                url: '/flash-templates/', type: 'POST', dataType: 'json', data: { 'form1': "chat_form", 'chat_name': $('#chat_name').val(), 'email': $('#chat_email').val(), 'chat_offline_message': $('#chat_offline_message').val() }, success: function (data) {
                    if (data.success) { $('.fist_p').html("<strong>Thank you!</strong><br /><br />Your message has been sent to our managers and someone will contact you shortly.") } else { $('.fist_p').html(data.errors) }
                    $('#chat_name').hide(); $('#chat_email').hide(); $('#chat_offline_message').hide(); $('.chat_message_status').hide(); $('.chat-text-small').html('<br />' + 'In the meantime, you may want to check out some helpful resources that ' + 'our other users just like you appear to enjoy.' + '<ul><li><' + 'a href="http://www.motocms.com/why/" target="_blank">Power Tips on Admin Panel Usage</a></li>' + '<li><' + 'a ' + ' href="http://www.motocms.com/faq/" target="_blank">Our F.A.Q. section</a></li>' + '<li><' + 'a href="http://www.facebook.com/motocms" target="_blank">Our Facebook community</a></li></ul>').css({ 'font-size': '14px' }); $('.chat-text-small ul').css({ 'list-style-type': 'circle', 'padding': '20px 12px 10px 15px' }); $('.chat-text-small li').css({ 'padding-bottom': '15px' }); $('.chat-text-small a').css({ 'color': '#bfdb83' })
                }, error: function (data)
                { $('.third_p').text("Message was not sent!"); $('.third_p').show(); $('#send_offline_message').show() }
            })
        }
    }
}
function launchChat(data) {
    var url = (data.href) ? data.href : "#"; if (url == "#")
        return !1; if ((data.presence == '1') || (data.presence == '2')) {
            window.open(url, "chat", "height=750,width=800"); try {
                if (_gaq)
                    _gaq.push(['_trackEvent', 'SiteUsage', 'Chat', 'StartChat'])
            } catch (e) { }
        }
        else { offlineForm1(); $('#send_offline_message').click(sendOfflineMessage) }
}
function getHref() {
    var href = "#"; var mail = ($('#chat_email').val() == 'Email: ' || $('#chat_email').val() == '') ? '' : $('#chat_email').val(); if (!validEmail(mail)) { $('#chat_email').addClass('invalid') } else {
        var name = ($('#chat_name').val() == '') ? 'Guest' : $('#chat_name').val(); var chatDomain = $('#form1').data('chat-domain'); if (!chatDomain)
            chatDomain = 'www.motocms.com'; getLink({ name: name, mail: mail, message: "", domain: chatDomain })
    }
    return !0
}

function checkCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "="); if (c_start != -1)
        { return !0 }
    }
    return !1
}
function setCookie(c_name, value, exdays)
{ var exdate = new Date(); exdate.setDate(exdate.getDate() + exdays); var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()); document.cookie = c_name + "=" + c_value + "; path=/" }
function validEmail(mail) {
    var ind = mail.indexOf('@'); if (ind == -1 || ind == 0 || ind == mail.length - 1)
    { return !1 }
    var indOfLastDot = mail.lastIndexOf('.'); if (indOfLastDot == -1 || (mail.length - 1) - indOfLastDot < 2 || indOfLastDot - ind < 2)
    { return !1 }
    return !0
}
function getLink(data) { $.ajax({ url: '/get_chat_operator_status.php', type: 'POST', async: !1, dataType: 'json', data: { ajax: 'true', app: 'chat', action: 'getlink', data: data }, success: function (data) { launchChat(data.data) }, error: function (data) { } }) }
function openChat()
{ $('.chat').animate({ 'right': '0' }, 500); $('.close-btn').show(); $(this).hide() }
function offlineForm1()
{ $('.chat').css({ 'background': 'url(/wp-content/themes/mototheme/images/chat-offline-bg.png)' }, 500); $('.chat').animate({ 'height': '460px' }, 1000); $('#chat_offline_message').show(); $('#send_offline_message').show(); $('#lounch_chat').hide(); $('.fist_p').text("Got questions about our templates? Drop us a line using the form below and we'll get right back to you!"); $('.second_p').hide() }
function closeChat()
{ $('.chat').animate({ 'right': '-382px' }, 500); $('.open-btn').show(); $(this).hide(); setCookie("Chat_visible", 1, 1) }
</script>