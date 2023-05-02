/*
Quiz-classen som er ansvarlig for å kjøre quizen. Inneholder funksjonene
- _Språk som bestemmer språk for quizen
- _Region bestemmer regioner som skal tas i bruk
- _Start_Timer starter en tidtagning
- _Skaff_Pokemon leser pokedexen og henter alle pokemon, deres nummere og typer, som tilhører regionene bestemt av _Region
- _Print_oppsett printer det generelle oppsettet av quizen. Printer også sluttoppsettet hvis kalt med variabelen "alt = True"
- _Exit avslutter quizen ved å printe fullstendig oppsett og tiden brukt
- _Riktig_svar fikse å oppdatere lister hvis riktige svar blir gitt
- Programmet kaller på de andre funksjonene og inneholder selve løkka som driver quizen.
*/

//Definer html struktur
const div = document.createElement("div");
div.setAttribute("id", "div");
div.setAttribute("style", "white-space: pre;");
document.body.appendChild(div);

const input = document.createElement("input");
input.setAttribute("id", "input");
document.body.appendChild(input);

const button = document.createElement("button");
button.setAttribute("id", "button");
button.textContent = "Submit";
document.body.appendChild(button);

//Definer globale variabler
let meny;
let språk;
let temp_tekst_var;
const variabler = {
    Hint: false,
    Korrekte: 0,
    Alle_Regioner: ["Test", "Kanto", "Johto", "Hoenn", "Sinnoh"],
    Alle_Språk: ["norsk", "norwegian", "engelsk", "english"],
    Avslutningstekst: ["Exit", "exit", "Quit", "quit", "Slutt", "slutt", "Avslutt", "avslutt"],
    Språk: false
};

function Lagre_tekst(tekst, lagre_variabel) {
    lagre_variabel = tekst;
}
function Vis_tekst(tekst, lagre_variabel = false) {
    div.textContent = tekst;
    
    if (tekst == undefined) {alert("Error: tekst is undefined");}
    else if (lagre_variabel != false) {Lagre_text(tekst, lagre_variabel);}
}
function Skaff_input_innhold(lagre_variabel) {
        lagre_variabel = input.value.toLowerCase();
        input.value = "";
    };

function _Språk() {
    /*
    Spør om språk fra bruker og setter dette språket for senere funksjoner. 
    Takler feilgitte språk ved å spørre på nytt.
    */
    
    // Spør om språk
    div.textContent = "Enter a desired language. English or Norwegian.\n/
                       Gi et ønsket språk. Engelsk eller norsk";
    button.onclick = Skaff_input_innhold;
    
    // Sjekker om dette er et støttet språk og håndter feil
    if (variabler.Avslutningstekst.contains(språk)) {
        window.location.href = "../index.html";
    }
    else if (variabler.Alle_Språk.contains(språk)) {
        div.textContent = "1. " + "\r\nPlease enter a guess:";
        _Meny(språk);
    }
    else {
        div.textContent = div.textContent + "\r\nThe submitted text is not a recognised language. Please enter a recognised one."
    }
}
function _Skaff_meny(språk) {
    /*
    Sjekker språk og skriver ut meny til terminalen. 
    */
    
    switch (språk) {
        case "norwegian":
            språk = "norsk";
            break;
        case "english":
            språk = "engelsk";
            break;
        default:
            språk;
    }
    
    fetch(`../resources/menyer/${språk}.txt`).then(innfil => innfil.text()).then(fil_tekst => Lagre_tekst(fil_tekst, meny));
}
function _Skaff_poeng() {
    /*
    Henter poengtabell
    */
    
    poengtabell = {
        Plass: [],
        Navn: [],
        Poeng: []
    }
    
    fetch("../resources/poeng.txt").then(innfil => innfil.text()).then(fil_tekst => Lagre_text(fil_text, temp_tekst_var));
}

function _Skriv_poengtabell() {
    /*
    Skriver ut poengtabell
    */
    
    if (språk == "norsk") {
        temp_tekst_var = "Poengtabell\n\nPlass    Navn        Poeng\n";
    else if (språk == "engelsk") {
        temp_tekst_var = "Score board\n\nRank     Name        Points\n"
    }
    
    lengde_plass = len(self.Plass[-1])
    lengde_navn = len(max(self.Navn, key = len))
    lengde_poeng = len(max(str(self.Poeng), key = len))
    
    print(poengtabell_tekst)
    for i in range(len(self.Poeng)):
        exec('plass = "%' + str(lengde_plass) + 's"%(self.Plass[i])')
        exec('navn = "%'+ str(lengde_navn) + 's"%(self.Navn[i])')
        exec('poeng = "%'+ str(lengde_poeng) + 's"%(self.Poeng[i])')
        
        print(plass + "    " + navn + "    " + poeng)
        
    print("\n") // Sørger for mellomrom til tekst
    
    input(pause_tekst)
    
    Vis_tekst(temp_tekst_var);
}

function _Region(self):
    /*
    Spør bruker om hvilke regioner som skal tas med i quizen.
    Takler bindeord ved å fjerne disse.
    Kan ta imot alle/all for at alle regioner skal brukes.
    Takler feilgitte språk ved å spørre på nytt.
    */
    
    // Setter språk
    if self.Språk == 0:
        input_tekst = "Hvilke(n) region(er) ønsker du? "
    elif self.Språk == 1:
        input_tekst = "What/which region(es) whould you like? "
    else:
        print("# No language has been choosen. Ending quiz #")
        exit()
    
    // Spør om region
    Region = input(input_tekst).split()
    
    bindeord = ["And", "and", "Og", "og"]
    indekser = []
    
    // Fjerner eventuelle bindeord og komma fra brukerinput
    for i in range(len(Region)):
        if Region[i] in bindeord: // Finner indeksen til bindeord i streng
            indekser.append(i)
        elif Region[i][-1] == ",": // Fjerner komma i streng
            Region[i] = Region[i][:-1]
    for i in indekser: // Fjerner bindeord i streng
        Region.pop(i)
    
    indekser = []
    
    // Fikser om regionsnavn ble gitt feil
    for i in range(len(Region)):
        while Region[i] not in self.Alle_regioner:
            if Region in ["Exit", "exit", "Quit", "quit", "Slutt", "slutt", "Avslutt", "avslutt"]:
                exit()
            elif Region[i] in ["Alle", "alle", "All", "all"]: // Fikser alle som input
                Region = self.Alle_regioner.pop(0)
            elif Region[i] in ["Ingen", "ingen", "Non", "non", "Nei", "nei", "No", "no"]: // Fikser fjerning av region
                indekser.append(i)
                Region[i] = "Kanto"
            else: // Spør om ny region hvis en av de gitte var feil
                if self.Språk == 0:
                    print("Regionen %s eksisterer ikke, eller er for ny. Velg en annen."%Region[i])
                    Region[i] = input(input_tekst).split()[0]
                elif self.Språk == 1:
                    print("The region %s doesn't exist or is too new. Choose another."%Region[i])
                    Region[i] = input(input_tekst).split()[0]
    for i in indekser: // Fjerner uønskede reginonsnavn i streng
        Region.pop(i)
    
    // Gjør region til en klassevariabel
    self.Region = Region

function _Skaff_Pokemon(self):
    /*
    Kaller på _Region, åpner og henter inn info fra Pokedex.txt og defienrer denne informasjonen som klassevariabler
    */
    
    self._Region()
    
    with open("Pokedex/Pokedex.txt", "r") as innfil: // Åpner Pokedex for lesing
        // Etablerer lister som skal fylles
        Tallene         = []
        Navna           = []
        Typene          = []
        Korrekte_navn   = []
        
        for i in range(2): // Hopper over de to første linjene
            innfil.readline()
        
        // Henter infoen som trengs, linje for linje
        for linje in innfil:
            if len(linje.split()) <= 1: // Hopper over tomme linjer
                False
            
            elif linje.split()[1] in self.Alle_regioner: // Lagrer hvilken region de neste pokemonene er fra
                midl = linje.split()[1]
            
            elif midl in self.Region: // Lagrer info hvis linja ikke inneholder region eller er blank, men regionen skal brukes
                Tall    = linje.split()[0]
                Navn    = linje.split("\t\t")[0][4:]
                
                if len(linje.split()) >= 4:
                    Type1   = linje.split()[-2]
                    Type2   = linje.split()[-1]
                
                else:
                    Type1   = linje.split()[-1]
                    Type2   = " "
                
                Tallene.append(int(Tall))
                Navna.append(Navn)
                Typene.append([Type1, Type2])
                Korrekte_navn.append(" ")
    
    self.Tallene        = Tallene
    self.Navna          = Navna
    self.Typene         = Typene
    self.Korrekte_navn  = Korrekte_navn
    self.Antall         = len(Tallene)

function _Print_oppsett(self, alt = False):
    /*
    Printer oppsettet for quizen, eller hele oppsettet med alle svarene hvis quizen skal avsluttes
    */
    
    system("cls") // Sletter alt i terminalvinduet
    print("### QUIZ! ###")
    
    if alt: // Printer oppsett pluss svar hvis quizen skal avsluttes
        for i in range(len(self.Tallene)):
            if self.Hint == False:
                if self.Korrekte_navn[i] == self.Navna[i]:
                    print("%03i V %s"%(self.Tallene[i], self.Navna[i]))
                else:
                    print("%03i X %s "%(self.Tallene[i], self.Navna[i]))
            else:
                if self.Korrekte_navn[i] == self.Navna[i]:
                    print("%03i V %-11s  %-8s %-8s"%(self.Tallene[i], self.Navna[i], self.Typene[i][0], self.Typene[i][1]))
                else:
                    print("%03i X %-11s  %-8s %-8s"%(self.Tallene[i], self.Navna[i], self.Typene[i][0], self.Typene[i][1]))
    
    else: // Printer oppsett for quiz
        for i in range(len(self.Tallene)):
            if self.Hint == False:
                print("%03i  %s"%(self.Tallene[i], self.Korrekte_navn[i]))
            else:
                print("%03i  %-11s  %-8s %-8s"%(self.Tallene[i], self.Korrekte_navn[i], self.Typene[i][0], self.Typene[i][1]))
    
    // Printer antall korrekte svar funnet
    if self.Språk == 0: // Norsk
        print("Riktige svar: %i/%i"%(self.Korrekte, self.Antall))
    elif self.Språk == 1: // Engelsk
        print("Correct answers: %i/%i"%(self.Korrekte, self.Antall))
    else: // Ingen språk
        print("# No language has been choosen. Ending quiz #")
        exit()

function _Lagre_poeng(self):
    /*
    Regner ut poeng og lagrer i poengtabell
    */
    
    Lagret = False
    
    Poeng = self.Korrekte * 15 / (self.slutt_tid - self.start_tid)
    
    if self.Språk == 0: // Norsk
        poeng_tekst = "Din poengsum er %4.2f poeng!"%Poeng
        spørsmål_tekst = "Hva er navnet ditt? "
    elif self.Språk == 1: // Engelsk
        poeng_tekst = "Your score is %4.2f points!"%Poeng
        spørsmål_tekst = "What is your name? "
    else: // Ingen språk
        print("# No language has been choosen. Ending quiz #")
        exit()
    
    print(poeng_tekst) // Skriver ut poengsum
    print(" ")
    
    Navn = input(spørsmål_tekst) // Henter navn på spiller
    
    // Oppdaterer tabellen
    for i in range(len(self.Poeng)): // Looper poeng lista
        if Lagret == True: // Hopper over hvis poeng allerede er lagret
            pass
        elif len(Plass) < 1: // Legger til hvis listene er tomme
            self.Plass.append("1.")
            self.Navn.append(Navn)
            self.Poeng.append("%4.2f"%Poeng)
            
            Lagret == True // Oppdaterer lagret status
        elif Poeng > self.Poeng[i]: // Lagrer Poeng på første sted de slår poengsummen
            lengde = str(len(self.Plass[-1]) - 1)
            self.Plass.insert(i, "%" + lengde + "i."%i)
            self.Navn.insert(i, Navn)
            self.Poeng.insert(i, "%4.2f"%Poeng)
            
            Lagret = True // Oppdaterer lagret status
        else: // Hopper over hvis scoren er for dårlig
            pass
    if Lagret != True: // Hvis poengsummen er dårligs legges den til sist
        lengde = str(len(self.Plass[-1]) - 1)
        self.Plass.append("%i"%int(self.Plass[-1].split(".")[0]) + 1)
        self.Navn.append(Navn)
        self.Poeng.append("%4.2f"%Poeng)
    
    with open("Poengtabell/Poeng.txt", "w") as utfil:
        for i in range(3):
            utfil.readline()
        for i in range(self.Poeng):
            utfil.outwrite("%" + lengde + "i."%self.Plass[i] + " " * space_1 + self.Navn[i] + " " * space_2 + Poeng[i])
    
function _Exit(self):
    /*
    Avslutter quizen ved å kalle på oppsett og printe tiden brukt
    */
    
    self._Print_oppsett(alt = True) // Kaller på oppsett der svarene skal gis
    
    // Sett beskjeder utifra språk
    if self.Språk == 0: // Norsk
        første_linje = "# Avslutter quizen #"
        andre_linje = "# Tid brukt er %i min og %i sek # "%((self.slutt_tid - self.start_tid) // 60, (self.slutt_tid - self.start_tid) % 60)
        spørsmål_tekst = "Vil du lagre poengsum? "
        ikke_tekst = "Lagrer ikke poeng."
    elif self.Språk == 1: // Engelsk
        første_linje = "# Ending quiz #"
        andre_linje = "# Time used is %i min and %i sec # "%((self.slutt_tid - self.start_tid) // 60, (self.slutt_tid - self.start_tid) % 60)
        spørsmål_tekst = "Do you want to save your score? "
        ikke_tekst = "Score not saved."
    else: // Ingen språk
        print("# No language has been choosen. Ending quiz #")
        exit()
    
    // Printer tiden
    print(første_linje)
    print(andre_linje)
    print(" ")
    
    // Spør om poeng skal lagres
    if input(spørsmål_tekst) in ["Ja", "ja", "Yes", "yes"]:
        self._Lagre_poeng()
    else:
        print(ikke_tekst)
    
    exit() // Avslutter programmet

function _Riktig_svar(self, Gitt):
    /*
    Oppdaterer lister hvis riktig svar er gitt, og printer nytt oppsett
    */
    
    // Takler situasjonen der to pokemon har samme navn
    if Gitt == "Nidoran":
        self.Korrekte_navn[31] = Gitt
        self.Korrekte += 1
    
    // Oppdaterer lister
    self.Korrekte_navn[self.Navna.index(Gitt)] = Gitt
    self.Korrekte += 1
    
    self._Print_oppsett() // Printer nytt oppsett

function Programmet(self):
    /*
    Selve programmet som kaller på funksjonene som skaffer språk, håndterer menyen og dens muligheter, laster inn pokemon info, skriver ut oppsett og starter timer.
    Tar imot svar og avgjør hva som skal gjøres med svaret utifra hva svaret er.
    */
    
    self._Språk() // Bestemmer språk
    
    self._Skaff_poeng() // Skaffer poengtabell fra fil
    
    Status = None
    while Status != "Start":
        // Sett beskjeder utifra språk
        if self.Språk == 0: // Norsk
            meny_tekst = "Hva vil du? "
            slutt_tekst = "Avslutter Program"
            støttede_tekst = "Støttede språk er:\n- Norsk\n- Engelsk"
            ikke_tekst = "Det var ikke en mulighet, prøv igjen!"
        elif self.Språk == 1: // Engelsk
            meny_tekst = "What do you want? "
            slutt_tekst = "Closing program"
            støttede_tekst = "Supported languages:\n- Norwegian\n- English"
            ikke_tekst = "This is not an option, try again!"
        else: // Språk ikke valgt
            print("# No language has been choosen. Ending quiz #")
            exit()
        
        self._Meny() // Printer meny
        Gitt = input(meny_tekst)
        if Gitt in self.Avslutningstekst: // Avslutter
            print(slutt_tekst)
            exit()
        elif Gitt in ["Start quiz"]: // Starter quiz
            Status = "Start"
        elif Gitt in ["Endre språk", "Change language"]: // Bytter språk
            system("cls") // Renser skjerm
            print(støttede_tekst)
            self._Språk()
        elif Gitt in ["Se poengtabell", "See score board"]: // Skriver ut poengtabell
            self._Skriv_poengtabell()
        else: // Hvis tekst ikke er et alternative sies det ifra, og menyen skrives ut på nytt
            print(ikke_tekst)
            sleep(3)
    
    // Sett beskjeder utifra språk
    if self.Språk == 0: // Norsk
        input_tekst = "Pokemon [Skriv slutt for å avbryte quizen]: "
        korr_navn_tekst = "Den pokemonen er allerede gitt."
        feil_tekst = "Feil navn eller stavemåte, prøv igjen!"
        ferdig_tekst = "# Gratulerer!!! Du klarte det #"
    elif self.Språk == 1: // Engelsk
        input_tekst = "Pokemon [Write quit to end quiz]: "
        korr_navn_tekst = "This Pokemon has already been given."
        feil_tekst = "Wrong name or spelling. Please try again!"
        ferdig_tekst = "# Congratulations!!! You did it #"
    else: // Språk ikke valgt
        print("# No language has been choosen. Ending quiz #")
        exit()
        
    self._Skaff_Pokemon() // Laster pokemon info
    self._Print_oppsett() // Printer oppsett
    
    Navna       = self.Navna
    Antall      = self.Antall
    
    self.start_tid = time() // Starter timer
    
    while self.Korrekte < Antall: // Selve løkka som slutter når alle svar er funnet eller bruker gir opp
        Gitt = input(input_tekst) // Tar imot input
        
        if Gitt in self.Avslutningstekst: // Avslutter hvis bruker gir opp
            self.slutt_tid = time() // Lagrer slutt tiden
            self._Exit()
        
        elif Gitt in ["Hint", "hint"]: // Fikser bruk av hint
            self.Hint = not self.Hint
            self._Print_oppsett()
        
        elif Gitt in self.Korrekte_navn: // Takler når korrekte svar blir gitt flere ganger
            print(korr_navn_tekst)
        
        elif Gitt in Navna: // Takler hvis svaret er riktig
            self._Riktig_svar(Gitt)
        
        else: // Takler hvis gitt svar ikke tilhører noen av de tidligere kategoriene
            print(feil_tekst)
    
    self.slutt_tid = time() // Lagrer slutt tiden
    
    print(ferdig_tekst) // Printer hvis bruker klarte alle riktige svar
    self._Exit() // Avslutter quizen når den er ferdig.