# Webbshop med React & Typescript

## Starta Projektet

Här är en lista på de olika skripten som kan köras i terminalen:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Uppdaterar testerna och behöver köras om läraren har ändrat dom.
- `npm run dev` - Startar dev servern.
- `npm test` - Startar dev servern & Cypress så du kan jobba med kravlistan.

> Om du får felet `Cypress verification timed out` kan du förlänga tiden för verifieringen - [läs mer här](https://stackoverflow.com/questions/63667880/cypress-verification-timed-out-after-30000-milliseconds).

## Rättning

Den här uppgiften rättas automatiskt utifrån de skriva testerna som finns i projektet. Det innebär att du kommer kunna se vilka krav du har uppfyllt när du utvecklar lokalt på din dator med Cypress. Du kommer också kunna se rättningen som en GitHub Action som körs varje gång du pushar kod till ditt repo.

Det kan vara bra att du kollar att rättning på GitHub stämmer överens med testerna lokalt i Cypress. Om de inte visa samma resultat kan du behöva köra `npm run update` för att få hem de senaste testerna så du kan åtgärda eventuella fel i din kod.

## Beskrivning

**Läs noga igenom hela uppgiftsbeskrivningen innan ni börjar.**

I den här laborationen ska ni i grupp om fyra skapa en webbshop med hjälp av React, NextJS, Typescript och ett designsystem som MUI, ChakraUI eller Mantine. Det ni ska skapa är fyra stycken sidor: en startsida, en produktsida, en kassasida och en bekräftelsesida (samt några admin sidor).

- /
- /product/{artikel-nummer}/{title}
- /checkout
- /confirmation/{order-nummer}

### Startsidan & Produktsidan

Er sida ska presentera ett antal olika produkter på startsidan. Vilka typer av produkter som säljs är valfritt men det ska vara seriöst och välgjort. Det ska vara möjligt att klicka på en produkt för gå till produktsidan där användaren kan läsa mer om den valda produkten. Från både startsidan och produktsidan ska det vara möjligt att lägga till produkter i en kundvagn och det ska tydlig framgå för användaren när produkten läggs till i kundvagnen.

### Kassasidan

#### Kundvagn

Ska lista tillagda produkter (bild & titel) dess antal, pris och kundvagnens totalpris. Det ska vara möjligt att uppdatera kundvagnen - dvs ändra antalet av en produkt eller ta bort en produkt helt från kundvagnen. Totalpriset ska alltid uppdateras och vara korrekt.

**OBS: Kundvagnen måste döpas till `cart` i localStorage.**

#### Leveransuppgifter

Ska vara ett formulär där användaren fyller i namn, mail, telefonnummer och adress. Fälten i formuläret ska gå att automatisk fyllas i. Samtliga fält ska valideras så att endast rätt information kan matas in.

#### Bekräftelsesidan

När alla delar har fyllts i på kassasidan så ska användaren kunna slutföra köpet och då få en bekräftelse på köpet tillsammans med ett unikt ordernummer.

Tänk på att det inte ska gå att placera ordern två gånger, även om man navigerar tillbaka på sidan! All orderinformation som användaren har matat in skall presenteras i bekräftelsen som ett bevis på att ni har hanterat datan i alla formulären korrekt.

### Adminsidan

Designen på denna sida är valfri men skall utgå ifrån designsystemet ni använder er av. Det skall finnas en knapp på startsidan som tar användaren till adminsidan. På adminsidan skall ni lista alla produkter samt ge användaren möjlighet att ta bort, lägga till eller ändra samtliga produkter (CRUD). Om ni väljer att ha en separat sida, modal eller accordion för ändring/tilläggning av en produkt är valfritt men flödet ska vara routat. Samtliga produkter skall vara sparade på något sätt, lämpligast i en databas.

## Inlämning

För att bli godkänd på den här uppgiften MÅSTE ni använda GIT och GitHub. Inlämningen sker som vanligt på läroplattformen där ni ska zippa ihop projektmappen (kom ihåg att ta bort node_modules). I projektmappen ska det finnas (utöver all kod) en README.md fil. Den ska innehålla en titel, beskrivning av projektet, info om hur projektet byggs och körs samt länk till dokumentationen för designsystemet som används, mm.

## Presentation

Ni ska vid presentationstillfället hålla i en muntlig presentation för klassen. Ni ska gå igenom följande punker under presentationen:

- Presentation och genomgång av er webbshop.
- Utvalda delar av er kod, struktur och dess flöde.
- Reflektioner om projektets genomförande.

## Kravlista

### Lista på attribut som ska finnas i koden för Godkänt

- Produkt-korten/raden på startsidan & adminsidan.
- Artikelnumret på en produkt.
- Titeln på en produkt.
- Priset på en produkt.
- Beskrivningen av en produkt.
- Lägg till i kundvagnen knappen.
- Toast som visas när en produkt läggs till i kundvagnen.

---

- Knapp som öppnar kundvagnen i en sidomeny. (valfri)
- Knappen för att gå till kundvagnen/kassasidan.
- Siffran intill kundvagnsikonen som visar antalet tillagda produkter.
- En produktrad på kassasidan.
- Knappen för att öka antalet av en produkt på kassasida.
- Knappen för att minska antalet av en produkt på kassasida.
- Antalet valda produkter av samma typ på kassasida.
- Totala priset för alla produkter i kundvagnen.

---

- Formulär för att fylla i kunduppgifter på checkout-sidan.
- Kundens namn (som fylls i på checkout-sidan).
- Kundens gatuadress (som fylls i på checkout-sidan).
- Kundens postnummer (som fylls i på checkout-sidan).
- Kundens stad (som fylls i på checkout-sidan).
- Kundens emailadress (som fylls i på checkout-sidan).
- Kundens telefonnummer (som fylls i på checkout-sidan).
- Felmeddelande vid felaktigt angivet namn.
- Felmeddelande vid felaktigt angiven adress.
- Felmeddelande vid felaktigt angivet postnummer.
- Felmeddelande vid felaktigt angiven stad.
- Felmeddelande vid felaktigt angiven emailadress.
- Felmeddelande vid felaktigt angivet telefonnummer.

---

- Den länk/knapp som går till admin.
- Edit-knappen för admin som ska editera en produkt.
- Den knapp som ska kunna radera en produkt.
- Konfirmera att man vill radera en produkt.

---

- Formuläret för att lägga till eller editera en produkt.
- Felmeddelande vid felaktigt angiven titel.
- Felmeddelande vid felaktigt angiven beskrivning.
- Felmeddelande vid felaktigt angivet pris.
- Felmeddelande vid felaktigt angiven bild.

### Krav för Godkänt

- [ ] Git & GitHub har använts
- [ ] Projektmappen innehåller en README.md fil - (läs ovan för mer info)
- [ ] Uppgiften lämnas in i tid!
- [ ] Ett designsystem används som exempelvis Shadcn eller MUI

**Home**

- [ ] Ska ha en övergripande layout med header, main & footer.
- [ ] Startsidan ska lista samtliga produkter.
- [ ] Det ska gå att lägga till produkter i kundvagnen (header + toast).
- [ ] Det ska gå att klicka på en produkt och komma till en detaljsida.
- [ ] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Produkt**

- [ ] Ska ha en övergripande layout med header, main & footer.
- [ ] Detaljsidan ska visa all info om en produkt.
- [ ] Det ska gå att lägga till produkten i kundvagnen (header + toast).
- [ ] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Kundvagn & Checkout**

- [ ] Ska ha en övergripande layout med header, main & footer.
- [ ] Det ska gå att gå till checkoutsidan och se innehållet i kundvagnen (knapp & url).
- [ ] Det ska gå att se det totala priset i kundvagnen.
- [ ] Det ska gå att ändra produkterna i kundvagnen (header + vyn + pris).
- [ ] Det ska gå att ange leveransuppgifter i ett formulär.
- [ ] Samtliga fält för checkoutsidans formulär ska ha valideringsregler.
- [ ] Formulären vid utcheckningen ska gå att automatiskt fyllas i.
- [ ] Bekräftelsesidan ska visa orderdetaljer och leveransuppgifter

**Admin**

- [ ] Det finns en admin-sida för produkthantering
- [ ] Det ska gå att se alla produkter på admin sidan
- [ ] Det går att lägga till produkter via admin sidan
- [ ] Det går att ta bort produkter via admin sidan
- [ ] Det går att redigera produkter via admin sidan
- [ ] Samtliga fält för adminsidans formulär ska ha valideringsregler

_Gjorda krav ska kryssas för._
