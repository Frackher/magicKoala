// Binding events shortcut
const bindEvent = (selector, event, callback, multi) => {   
    if(multi){
        const dom = document.querySelectorAll(selector);
        if (dom.length > 0 )
            dom.forEach(el => el.addEventListener(event, callback));                
    } else {
        const dom = document.querySelector(selector);
        if (dom != undefined)
            dom.addEventListener(event, callback);            
    }
}

// Geoloc launch
const geoloc = () => {
    document.getElementById('geoloc').classList.add('animate');
}

// Erase default Value of field
const eraseField = (field) => {
    const el = document.getElementById(field);
    el.classList.add('active');
    el.value = '';
}


// List of events possible
const associateEvents = () => {
    bindEvent('#splash button','click',geoloc,false);
    bindEvent('#search','focus',()=>{eraseField('search');}, false);
    bindEvent('#geoloc button.bottom','click',()=>{window.location.assign("./user/hp")},false);
    bindEvent('#filter .change button','click',function(){switchFilters(this)},true);
    bindEvent('#searchDeal .fluid > button','click',animateFilter,false);
    bindEvent('#filter > button.mi-round','click',animateFilter,false);
    bindEvent('#store #expand','click',expandShop,false);
    bindEvent('#store > button.mi-round','click',()=>{window.history.back();},false);
}

// Animation expanding shop informations
const expandShop = () => {
    let infos = document.querySelector('#store .infos');
    let expand = document.getElementById('expand')

    if(!infos.classList.contains('animate') && !infos.classList.contains('deanimate')){
        infos.classList.add('animate');
        expand.textContent = 'expand_less'
    }else if(infos.classList.contains('animate')){
        infos.classList.replace('animate','deanimate');
        expand.textContent = 'expand_more'
    }else {
        infos.classList.replace('deanimate','animate');
        expand.textContent = 'expand_less'
    }


}

// Manage animating filter
const animateFilter = () => {
    let filter = document.getElementById('filter');

    if(filter.getAttribute('class') == null){
        filter.classList.add('animate');
    }else if(filter.getAttribute('class') == 'animate'){
        filter.classList.replace('animate','deanimate');
    }else {
        filter.classList.replace('deanimate','animate');
    }
}

// Switch form categories <=> hours
const switchFilters = (context) => {
    document.querySelectorAll('#filter .change button').forEach(el => {
        el.classList.remove('on');
    });
    document.querySelectorAll('#filter form').forEach(el => {
        el.classList.add('dNone');
    });
    context.classList.add('on');
    document.getElementById(context.dataset.id).classList.remove('dNone');
}

// Register Service worker
const serviceWorker = () => {
    if ('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js', {scope : './'})
            .then(reg=> {
                console.log('Le service worker a été enregistré');
            }).catch(error=>{
                console.error(error);
            });
    } else {
        console.log('Ce navigateur ne supporte pas cette API');
    }
}


// Actions launched when Dom is Ready
const launchCheckPoints = () => {
    associateEvents();
    //serviceWorker();
}

// Get RealReady element
if (document.readyState === 'loading') {  // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', launchCheckPoints);
} else {  // `DOMContentLoaded` has already fired
    launchCheckPoints();
}