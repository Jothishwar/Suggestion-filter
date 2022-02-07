const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities=[];
fetch(endpoint)
	.then(e=>e.json())
	.then(data=>cities.push(...data));

function find(word,cities) {
	return cities.filter(place=>{
		const regex=new RegExp(word,'gi');
		return place.city.match(regex) || place.state.match(regex);
	});
}

function display() {
	const arr=find(this.value,cities);
	const html=arr.map(data=>{
		const regex=new RegExp(this.value,'gi');
		const city=data.city.replace(regex,`<span class="hl">${this.value}</span>`);
		const state=data.state.replace(regex,`<span class="hl">${this.value}</span>`);
		return `
			<li>
			    <span class="name">${city}, ${state}</span>
			    <span class="population">${data.population}</span>
			</li>
		`;
	}).join(' ');
	suggestions.innerHTML=html;
}
const search=document.querySelector('.search');
const suggestions=document.querySelector('.suggestions');

search.addEventListener('change',display);
search.addEventListener('keyup',display);