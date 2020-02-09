let profileButtons = ['username-edit', 'email-edit', 'password', 'firstName-edit', 'lastName-edit'];

// This will keep track of the edit buttons in the users profile and when they click
// one it will allow them to edit that profile attribute
profileButtons.forEach(button=>{
    let buttonSelector = document.getElementById(button);

    buttonSelector.addEventListener('click',()=>{
        let input = document.getElementById(button.split('-')[0]);
        input.readOnly = !input.readOnly;
    });
})