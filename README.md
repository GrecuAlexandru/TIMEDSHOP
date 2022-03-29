# TIMEDSHOP


Descriere

Pagina web "TimedShop" reprezinta un magazin online si functional de haine, pregatit pentru lansare live.
Designul paginii este unul atractiv, original si usor de navigat, capabil de a se adapta la dimensiunea ecranului oricarui dispozitiv.



Functionalitatile acestui magazin:

- creeare de cont client/accesare de cont client (cu securitate)
- afisare catalog produse (poza, pret, denumire, reducere, pret redus, marimi si culori valabile in stoc)
- cautare dinamica a unui produs din baza de date
- sortarea produselor afisate in functie de anumite criterii
- alegerea marimii si a culorii produsului ales
- adaugare produselor in cosul de cumparaturi (chiar daca utilizatorul are cont sau nu)
- adaugare produselor la favorite
- schimbarea cantitatii, culorii sau a marimii produselor aflate deja in cos, inainte de checkout
- checkout: Introducere adresa de email, nume, numar de telefon, adresa de livrare, informatii card -> cumparare
- adaugarea produselor cumparate in istoricul de cumparari, vizibil in detaliu din contul utilizatorului
- in cazul in care apare vreo eroare, utilizatorul este intampinat de un mesaj informativ ce ii ofera posibilitatea sa raporteze problema
- responsive design (telefon, tableta, monitor)



Tehnologii folosite:
    Limbaje de programare:
        - HTML5
        - Javascript
        - Css
    
    Framework-uri, API-uri:
        - Node.js

        - Firebase Database -> baza de date securizata in care sunt stocate informatii precum: datele utilizatorilor, datele fiecarui produs(pret, nume, descriere marimi valabile, etc), comenzi noi, probleme raportate, istoric comenzi utilizatori;

        - Stripe -> folosit pentru checkout. Am folosit servicile oferite de aceasta platforma pentru gestionarea checkout-urilor (incasari). Datele precum nume, prenume, adresa de livrare, adresa de email, numar de telefon sunt trimise prin intermediul Firebase Functions catre baza noastra de date. In schimb, Stripe se ocupa de inregistrarea datelor confidentiale precum credentialele cardurilor si tranzactiile bancare;

        - Firebase Functions -> Adaugare dinamica (si securizata impotriva atacurilor) a comenzilor finalizate (platite) in baza noastra de date;

        - Bunny.net (content delivery network) -> Folosit ca baza de data pentru stocarea de imagini ale produselor. Foarte util pentru reducerea costurilor traficului, folosindu-se de cache-ul browserelor;

        - Algolia -> Motor de cautare dinamic si eficient, ce nu afecteaza cu nimic experienta utilizatorului, a produselor din baza de date;
    

    Motivul principal pentru alegerea acestor API-uri este securitatea utilizatorului. Site-ul este capabil sa fie lansat live fara nicio problema datorita acestui lucru. Datele confidentiale ale utilizatorilor nu pot fii accesate de catre nimeni, inclusiv de mine.



Cerinte sistem:

- acces la internet
- orice browser
