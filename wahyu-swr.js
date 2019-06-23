/* program file service-worker 

self.addEventListener('install',	function(event)	{
		console.log('Service	worker	installing...');
		//	TODO	3.4:	Skip	waiting
		self.skipWaiting();
		//pada TODO 3.4 adalah berfungsi untuk mengklik melanjutkan untuk tidak menunggu instaling worker
});
self.addEventListener('activate',	function(event)	{
		console.log('Service	worker	activating...');
		//pada event diatas adalah untuk mengaktifkan service worker dan akan keluaran di menu console "service worker activating"
});
self.addEventListener('fetch',	function(event)	{
		console.log('Fetching:',	event.request.url);
		//pad event diatas yaitu eventaddlistener yaitu fetch berfungsi untuk mencari fetch dengan url yang diminta dan pada console akan ditampilkan "Fatching : , event.request.url yaitu url yang di minta "
});
*/


var	CACHE_NAME	=	'static-cache';
//penginisialisasian nam dari cache_name yaitu dengna nama "static-cache"
var	urlsToCache	=	[
		'.',
		'pages/images/.',
		'index.html',
		'nav.html',
		'pages/about.html',
		'pages/contact.html',
		'pages/galeri.html',
		'pages/home.html',
		'pages/pendidikan.html',
		'pages/profil.html',
		'pages/skill.html',
		'css/materialize.css',
		'css/materialize.min.css'
		];
		// kemudian variabel ini menghubungkan dari url ke cache dengan nama urlcache "index.html" dan "styles/main,css"

self.addEventListener('install',	function(event)	{
	//sintaks diatas adalah sintaks dengan menambah event yaitu install 
		event.waitUntil(
		
				caches.open(CACHE_NAME)
				.then(function(cache)	{
						return	cache.addAll(urlsToCache);
		//event.waitUntil ini akan menunggu sampai cache terbuka dan akan ke fungsi cache lalu kemudian cache akan ditambahkan kesemua dari variable "urlsToCache"
				})
		);
});

self.addEventListener('fetch',	function(event)	{
	//sintaks diatas adlah untuk menambah event listenir ke fetch 
		event.respondWith(
				caches.match(event.request)
				.then(function(response)	{
						return	response	||	fetchAndCache(event.request);
		//event akan merespon dengan caches match dengan event.request jika dari event tersebut merespon maka dikembalikan fetchAndCache
				})
		);
});
function	fetchAndCache(url)	{
		return	fetch(url)
		.then(function(response)	{
				//	Check	if	we	received	a	valid	response
				if	(!response.ok)	{
						throw	Error(response.statusText);
				}
				return	caches.open(CACHE_NAME)
				//kembali membuka caches dengan variable "cache_name"
				.then(function(cache)	{
				//kemudian pada fungsi cache
						cache.put(url,	response.clone());
						// akan menaruh url dan mengclone/membuat kembaran
						return	response;
						//kembali ke reponse 
				});
		})
		.catch(function(error)	{
		//jika catch fungsi error 
				console.log('Request	failed:',	error);
				//maka akan ditampilkan di console dengan output "Request failed :', error"
				//	You	could	return	a	custom	offline	404	page	here
		});
}