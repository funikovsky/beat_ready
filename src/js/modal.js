;(function(){

const validateFields = (form, fieldsArray) => {

    fieldsArray.forEach(field => {

        field.removeClass("input-error")
        field.attr('placeholder', '');

        if(field.val().trim() == "") {
            field.addClass("input-error");
            field.attr('placeholder', 'Заполните это поле');
                    
            
        }
    });

    const errorsFields = form.find(".input-error");

    return errorsFields.length == 0;



}



$('.form').submit(e => {
    e.preventDefault();
    
    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

   

    
    

    const modal = $("#modal");
    const content = modal.find(".modal__content"); 


    const isValid = validateFields(form, [name, phone, comment, to]);

    modal.removeClass("error-modal")


    
    if(isValid) {
        const request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            }
        });

        request.done((data) => {
            content.text(data.message)
            $('.form').trigger("reset");

        });

        request.fail((data) => {
            content.text(data.responseJSON.message)
            modal.addClass("error-modal")
        });

        request.always(() => {
            const fancybox = new Fancybox([
                {
                    src: "#modal",
                    type: "inline",
                }
            ]);
        });
    }
});


$('.app-close-modal').click((e) => {
    e.preventDefault();
    const fancybox = Fancybox.close();
    
});

})()