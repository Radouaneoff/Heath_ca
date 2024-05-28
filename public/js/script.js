function darkmode() {
let seTheme = document.body;
seTheme.classList.toggle('dark-mode');
let theme ;
let btnn = document.getElementById('btnn');
if(seTheme.classList.contains('dark-mode')
){
    console.log('Dark Mode');
    theme = "DARK";
    seTheme.style.transition = '2s';
    btnn.innerText = 'Light';
}else{
    console.log('Light Mode');
    theme = "LIGHT";
    seTheme.style.transition = '2s';
    btnn.innerText = 'Dark';

}
localStorage.setItem('PageTheme',JSON.stringify(theme));


}


let Gettheme = JSON.parse(localStorage.getItem('PageTheme'));
console.log(Gettheme);
if(Gettheme = "DARK"){
    document.body.classList = "dark mode";
}