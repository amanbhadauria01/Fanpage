$(document).ready(function(){
    $('.editForm').hide();
    $('.editButton').on('click',function(){
        console.log('clicked');
        const currentcommentClass = $(this).attr('class').split(" ")[3];
        const currenteditForm = '.' + currentcommentClass + '.editForm';
        const currenteditButton = '.' + currentcommentClass + '#editButton';
        const currentdeleteButton = '.' + currentcommentClass + '#deleteButton'; 
        $(currenteditForm).show(); 
        $(currenteditButton).hide();
        $(currentdeleteButton).hide();
    })
    $('.cancelButton').on('click',function(){
        const currentcommentClass = $(this).attr('class').split(" ")[4];
        const currenteditForm = '.' + currentcommentClass + '.editForm';
        const currenteditButton = '.' + currentcommentClass + '#editButton';
        const currentdeleteButton = '.' + currentcommentClass + '#deleteButton';         
        $(currenteditForm).hide();
        $(currenteditButton).show();
        $(currentdeleteButton).show();
    })
});