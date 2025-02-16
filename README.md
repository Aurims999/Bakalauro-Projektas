# Dirbtinio intelekto modelių pritaikymas socialinių tinklų administravime

=======================================
## DUE TO AI MODEL SIZES, THE MODELS ARE NOT STORED IN THE GITHUB, AI FUNCTIONALITIES WERE DISABLED FOR DEMO PURPOSES
=======================================
##### Projekto autorius: Aurimas Būta

##### Vadovas: jaun. asist. Arnas Nakrošis

Šis bakalauro baigiamasis projektas nagrinėja socialinių tinklų taikomas turinio monitoringo priemones bei išbando dirbtiniu intelektu grįstų sistemų integravimą automatiniam duomenų vertinimui. Taip pat, šio projekto metu bandoma ieškot priemonių kaip asistuoti naudotojus keliančius į sistemą naujus įrašus, paruošiant automatines rekomendacijas turinio aprašui.

Šiame dokumente apžvelgiamos socialinių tinklų turinio moderavimo aktualijos, išsikeliami tiek funkciniai, tiek nefunkciniai reikalavimai kuriamam imitaciniam socialiniam tinklui, pateikiamas informacinės sistemos projektas bei gautų rezultatų aptarimas bei testavimas.

Socialinis tinklas, atsižvelgiant į šių laikų technologines aktualijas, naudoja React naudotojo sąsajos kūrimui, Node.js bei Express.js standartinių operacijų serverio realizacijai bei MongoDB svetainės duomenų saugojimui. Taip pat, sukurtas atskiras serveris naudojant Python Flask dirbtinio intelekto modelių naudojimui

## Pasileidimo instrukcijos

Backend:

```sh
cd server
npm install
npm start
```

Backend (AI):
### AI FUNCTIONALITIES DISABLED

```sh
cd server/AI
python app.py
```

Reikalingos Python bibliotekos:

```sh
python install flask
python install tensorflow
python install pillow
python install transformers
python install google-cloud-vision
python install flask-cors
```

> Dirbtinio intelekto modelius (aplankas - models) reikia rankiniu būdu įkelti į server/AI aplanką
> (Šis žingsnis atliekamas rankiniu būdu dėl per didelės modelių apimties bei github ribojimų)

FE:

```sh
npm run dev
```

> Platesnė diegimo instrukcija baigiamojo projekto ataskaitos 4.1 poskyryje
