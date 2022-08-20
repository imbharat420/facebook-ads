const Apikey='' //set your access Token here
let FB_GRAPH_URL=''
const GRAPH_URL = 'https://graph.facebook.com'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
let query;
const searchData = async ()=>{
	query = $('#query').value
	if(query.trim() != ''){
		FB_GRAPH_URL = `${GRAPH_URL}/search?q=${query}&type=adinterest&access_token=${Apikey}`
		console.log(FB_GRAPH_URL)
		$('.url').innerText = FB_GRAPH_URL
		await fetch(FB_GRAPH_URL)
  		.then(response => response.json())
  		.then(data =>{
  			setTable(data)
  		});
  		if(!$('#alert').classList.contains('d-none')){
	  		$('#alert').classList.add('d-none')
  		}
	}else{
		$('#alert').classList.remove('d-none')
	}
}

const setTable = ({data})=>{
	console.log(data)
	$('#tdata').innerHTML = ""

	if(data.length == 0){
		$("#noresult").classList.remove('d-none')
		return;
	}else{
		$("#noresult").classList.add('d-none')
	}

	data.map((record)=>{
			$('#tdata').innerHTML += 
			`<tr>
		      <td>${record.name}</td>
		      <td>${record?.topic ? record?.topic  : query}</td>
		      <td>${record.audience_size_upper_bound}</td>
		      <td>${record.audience_size_lower_bound}</td>
		      <td>${' '.concat(record.path)}</td>
		    </tr>`
		
	})
}


$('#searchnow').addEventListener('click',searchData)
