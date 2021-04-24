// this part prayer calendar
let date = document.getElementById('calendarDate');
let show = document.getElementById('show');
let select = document.getElementById('select');
show.addEventListener('click', function (e) {
    e.preventDefault();
    let year = date.value.slice(0, 4);
    let month = date.value.slice(5, 7);
    let day = date.value.slice(8, 10)
const api = new XMLHttpRequest();
    const url = `http://api.aladhan.com/v1/calendar?latitude=40&longitude=49&method=${day}&month=${month}&year=${year}`;
    api.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let allPost = JSON.parse(this.responseText);
            for (const post of allPost.data) {
                let fullTime = post.date.gregorian.day;
                let time = fullTime.split(",")
                if (time == day) {
                    let prayer = `
     <li class="title pb-3 pt-2"><strong> ${day} / ${month} / ${year}</strong></li>
     <li><b>İmsak:</b> ${post.timings.Imsak}</li>
<li><b>Sübh namazı:</b> ${post.timings.Fajr}</li>
     <li><b>Gün çıxır:</b> ${post.timings.Sunrise}</li>
     <li><b>Zöhr namazı:</b> ${post.timings.Dhuhr}</li>
     <li><b>Əsr namazı:</b>  ${post.timings.Asr}</li>
     <li><b>Məğrib namazı:</b> ${post.timings.Maghrib}</li>
     <li><b>İşa namazı:</b> ${post.timings.Isha}</li>
     <li><b>Gecə yarısı:</b> ${post.timings.Midnight}</li>
      `
                    select.innerHTML = prayer;
                };
            };
        };
    };
    api.open("GET", url, true);
    api.send();    
});


// this part for tab menu
let menu_header=document.querySelectorAll(".menu_header li");
let menu_body=document.querySelectorAll(".menu_body div");

menu_header.forEach(header=>{
   header.addEventListener("click",function(){
    let active=document.querySelector(".active");
this.classList.add("active");
active.classList.remove("active");
let index=this.getAttribute("data-index");

menu_body.forEach(body=>{
   if(body.getAttribute("data-index")==index){
body.classList.remove("d-none");
}else{
    body.classList.add("d-none");  
   }
})
   });
})
