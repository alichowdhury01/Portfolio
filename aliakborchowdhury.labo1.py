def menu():
    def menu_utilisateur():

        choix = int(input("\nMENU:\n"
                          "1. Exécuter problème 1\n"
                          "2. Exécuter problème 2\n"
                          "3. Exécuter problème 3\n"
                          "4. Exécuter problème 4\n"
                          "5. Exécuter problème 5\n"
                          "6. Exécuter problème 6\n"
                          "7. Fermer\n"
                          "Veuillez faire votre sélection: "))
        return choix

    def selection():

        # On demande à l'utilisateur de faire un choix et ce choix sera la valeur en un nombre entier
        selected = int(input("\n1. Afficher votre nom\n"
                             "2. Afficher votre numéro d'étudiant\n"
                             "Veuillez faire votre sélection: "))

        # Ici le programme s'exécute basé sur la valeur choix et retournera une phrase :
        if selected == 1:
            print("Nom: Ali Akbor Chowdhury")
        elif selected == 2:
            print("Numéro d'éudiant: 2295410")
        else:
            print("Votre choix n'est pas valide")
        return

    def calcul_exposant(base, exposant):

        # La valeur puissance prendra en équation les valeur argument
        puissance = base ** exposant

        # L'exécution de la fonction basé sur les valeur que 
        # nous allons lui envoyé dans les arguments
        # Il va soit afficher l'équation de la valeur puissance 
        # seulement si les argument ne sont pas négatifs
        # Ou sinon, il affichera une erreur
        if 0 < base and 0 < exposant:
            print(puissance)
        else:
            print("ERREUR")
        return

    def calcul_diviseur():

        # La valeur nb_entier deviendra le input qu'on demande à l'utilisateur
        # La valeur est considéré comme un entier
        nb_entier = int(input("\nVeuillez entrer un nombre entier: "))

        # Basé sur la valeur nb_entier, si ce nombre est divisible par 2 ou 3
        # Nous aurons une phrase avec le résultat de la valeur nb_entier divisé par 2 et 3
        # Sinon il affichera que le nombre n'est divisible
        if nb_entier % 2 == 0 or nb_entier % 3 == 0:
            print(f"Voici votre nombre divisible par 2 ou 3: {nb_entier / 2}, {nb_entier / 3}")
        else:
            print("Votre nombre n'est pas divisible par 2 ou par 3")
        return

    def annee_de_demi_siecle():

        # On demande à l'utilisateur d'entrer son année de naissance que prendra la valeur annee_de_naissance
        # soula forme d'un int
        annee_de_naissance = int(input("\nVeuillez entrer votre année de naissance: "))

        # La fonction affichera une phrase tout dépendament si la vérification de la valeur annee_de_naissance 
        # Est plus grand ou plus petit que 1972
        if annee_de_naissance < 1972:
            print(f"Vous avez eu 50 ans en {(annee_de_naissance + 50)}")
        elif annee_de_naissance > 1972:
            print(f"Vous aurez 50 ans en {(annee_de_naissance + 50)}")
        else:
            print("Vous avez 50 ans cette année!")
        return

    # Fonction calcul_flotant qui prend 3 arguments
    def calcul_flotant(nb1, nb2, nb3):

        # Ici nous avons 2 valeur qui sont des équations avec nos arguments de notre fonction
        multiplication = nb1 * nb2
        division = multiplication / nb3

        # On retourne la valeur de la division
        return division

    # Cette valeur indique les valeur flotant dans nos arguments
    # Il sera utile pour pour passer le résultat en virgule pour un print en format string et flotant

    def phrase_complet():

        # On demande 2 valeur en format string et un en int à l'utilisateur
        plat_prefere = input("\nVeuillez entrer le nom votre plat préféré: ")
        pays_prefere = input("Veuillez entrez le nom de votre pays préféré : ")
        annee_future = int(input("Veuillez entrer une année future: "))

        # On retoune une phrase avec les valeur que nous avons demandé en input
        return print \
            (f"Vous aurez l'opportunité de manger {plat_prefere}, lorsque vous visiterai {pays_prefere} en {annee_future}.")

    choix = menu_utilisateur()

    while choix != 7:
        if choix == 1:
            selection()
        if choix == 2:
            calcul_exposant(2, 3)
        if choix == 3:
            calcul_diviseur()
        if choix == 4:
            annee_de_demi_siecle()
        if choix == 5:
            resultat = calcul_flotant(float(56.3), float(2.1), float(3.6))
            print(f"Résultat: {resultat:.3f}")
        if choix == 6:
            phrase_complet()
        choix = menu_utilisateur()

menu()
