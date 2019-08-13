$(document).ready(function() {
    jQuery.validator.addMethod('alnum', function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    }, '只能英文字母和数字');
    $("#login").validate({
        rules:{
            USER_ID:{
                required:true,
                maxlength:20,
                alnum:$('#username').val()
            },
            USER_PWD:{
                required:true,
                maxlength:20,
                alnum:$('#psw').val()
            }
        },
        messages:{
            USER_ID:{
                required:"请输入用户名",
                maxlength:"最多输入20个字符"
            },
            USER_PWD:{
                required:"请输入密码",
                maxlength:"最多输入20个字符"
            }
        },
        onkeyup:false,
        focusCleanup:true,
        success:"valid",
        submitHandler:function(form){
            var username = $('#username').val();
            var psw = $('#psw').val();
            //var pw = hex_md5(psw);
            $.ajax({
                url:LOGIN,
                dataType:"text",
                type:'POST',
                data:{
                        name: username,
                        password: psw
                    },
                success: function(data) {
                    if (data=='False'){
                        alert('用户名或密码不正确')
                    }else {
                        localStorage.setItem('username', username);
                        window.location.href='./html/commodityManage.html';
                    }
                }
            });
        }
    }); 
});