folder:
	-main_page:
		sadrzi glavnu stranicu sa guest i user funkcijama
		nalaze se html, css i js fajl-ovi
		OpenLayers.js i theme se ne diraju (ne menjati nista u njima)
		stanica komunicira sa login.html i register.html stranicama
		
		podlozni promenama su main_page.html, main_page.css i main_page.js		
	
	-login_register:
		sadrzi 2 html-a i css
		css je deljen za oba html-a
		svrha je da postoji stranica za registraciju i login korisnka
		stranice komuniciraju sa loading.html stranicom
		
		podlozni promenama su login.html, register.html i login_register.css
		
	-loading:
		sadrzi html, css i js
		svrha je da se ova stranica odigrava dok se vrsi komunikacija sa 
		serverom i proverava da li su dobro uneti podaci
		stranica komunicira sa login.html, register.html i main_page.html stranicama
		
		podlozni promenama su loading.html, loading.css, loading.js

trenutno stanje foldera i fajlova:
	u izradi; treba ubaciti mapu, implementirati funkcionalnosti i testirati resenje (15.03.2020.)