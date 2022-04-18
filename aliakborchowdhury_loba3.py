def jeu_de_carte():
    
    def menu_utilisateur():

        choix = int(input("\nMENU:\n"
                          "1. Afficher l'état du jeu de carte\n" \
                          "2. Effectuer un brassage inter-coupé\n" \
                          "3. Effectuer un brassage par paquets\n" \
                          "4. Sauvegarder l'état final dans un fichier\n" \
                          "Veuillez faire votre sélection: "))
        return choix

    def paquet():

        type_carte = ["♦", "♣", "♥", "♠"]
        deck1 = []
        deck2 = []
        deck3 = []
        deck4 = []

        for i in range(1, 14):
            deck1.append(f'{type_carte[0]}{i}')
            deck2.append(f'{type_carte[1]}{i}')
            deck3.append(f'{type_carte[2]}{i}')
            deck4.append(f'{type_carte[3]}{i}')
        deck = deck1 + deck2 + deck3 + deck4
        return deck

    def affichage(deck):
        for item in range(len(deck)):
            if item % 10 == 0 and item != 0:
                print(f'\n{deck[item]}  ', end="")
            else:
                print(f'{deck[item]}  ', end="")
        return

    def inter_coupe(deck):

        # On split le deck en 2
        demi_deck1 = deck[0:26]
        demi_deck2 = deck[26:52]
        deck_brasser = []

        # On rajoute une carte à la fois
        # De notre deck1 et deck 2, x26
        for i in range(26):
            deck_brasser.append(demi_deck1[i])
            deck_brasser.append(demi_deck2[i])
        deck = deck_brasser
        return deck

    def par_paquet(deck):

        # On split le deck en paquet 4, x13
        deck1 = deck[0:4]
        deck2 = deck[4:8]
        deck3 = deck[8:12]
        deck4 = deck[12:16]
        deck5 = deck[16:20]
        deck6 = deck[20:24]
        deck7 = deck[24:28]
        deck8 = deck[28:32]
        deck9 = deck[32:36]
        deck10 = deck[36:40]
        deck11 = deck[40:44]
        deck12 = deck[44:48]
        deck13 = deck[48:52]

        deck = deck7 + deck1 + deck3 + deck13 + \
               deck2 + deck4 + deck11 + deck6 + \
               deck8 + deck5 + deck12 + deck10 + \
               deck9
        return deck

    def sauvegarde(deck):

        fichier = open("cards.txt", "w", encoding='utf8')

        for item in range(len(deck)):
            if item % 10 == 0 and item != 0:
                fichier.write(f'\n{deck[item]}  ')
            else:
                fichier.write(f'{deck[item]}  ')
        fichier.close()

    deck = paquet()
    choix = menu_utilisateur()

    while choix != 4:
        if choix == 1:
            affichage(deck)
        if choix == 2:
            deck = inter_coupe(deck)
        if choix == 3:
            deck = par_paquet(deck)
        choix = menu_utilisateur()

    sauvegarde(deck)


jeu_de_carte()
