from copy import copy
from copy import deepcopy
from encodings import utf_8
import math


'''
Utilisation d'un dictionnaire sera plus facile dans ce programme afin 
d'aller chercher le nom de l'équipe qui sera la clé et les valeurs
'''

def  lecture_fichier():

    f1 = open("data1.txt", "r", encoding='utf8')
    f2 = open("data2.txt", "r", encoding='utf8')
    f3 = open("data3.txt", "r", encoding='utf8')

    # Le f1 désigne le fichier data1.txt,
    # f2 pour data2.txt et f3 pour data3.txt
    read_line_f1 = f1.readlines()
    read_line_f2 = f2.readlines()
    read_line_f3 = f3.readlines()

    # Convertion de chaque ligne en float
    read_line_f1[1] = float(read_line_f1[1])
    read_line_f1[2] = float(read_line_f1[2])
    read_line_f1[3] = float(read_line_f1[3])
    read_line_f1[4] = float(read_line_f1[4])
    read_line_f1[5] = float(read_line_f1[5])

    read_line_f2[1] = float(read_line_f2[1])
    read_line_f2[2] = float(read_line_f2[2])
    read_line_f2[3] = float(read_line_f2[3])
    read_line_f2[4] = float(read_line_f2[4])
    read_line_f2[5] = float(read_line_f2[5])

    read_line_f3[1] = float(read_line_f3[1])
    read_line_f3[2] = float(read_line_f3[2])
    read_line_f3[3] = float(read_line_f3[3])
    read_line_f3[4] = float(read_line_f3[4])
    read_line_f3[5] = float(read_line_f3[5])
    
    # Création d'un dictionnaire
    dictionnaire_equipe = {'A': read_line_f1[1:6], 'B': read_line_f2[1:6], 'C': read_line_f3[1:6]}

    f1.close()
    f2.close()
    f3.close()
    return dictionnaire_equipe

# La valeur liste_quipe permet de faire exécuté la fonction lectu_fichier ailleur
# afin d'accèder les données
liste_equipe = lecture_fichier()

# Permet d'aller chercher la valeur le plus petit
meilleur_temps = min(liste_equipe, key=liste_equipe.get)

# Moyenne de chaque équipe, on fait la sum des données diviser par le
# len qui est le nombre de ligne qui est le nombre de de données
equipeA_moyenne = f"{sum(liste_equipe['A']) / len(liste_equipe['A']):.3f}"
equipeB_moyenne = f"{sum(liste_equipe['B']) / len(liste_equipe['B']):.3f}"
equipeC_moyenne = f"{sum(liste_equipe['C']) / len(liste_equipe['C']):.3f}"

liste_moyenne = [equipeA_moyenne + ": Equipe A", equipeB_moyenne + ": Equipe B", equipeC_moyenne + ": Equipe C"]
liste_sorted = sorted(liste_moyenne)

def execution_user(arg):

    print("1 pour Afficher les statistiques\n"
          "2 pour Sauvegarder les statistiques\n"
          "3 pour Afficher l'équipe avec les coureurs les plus similaires\n"
          "4 pour Ajouter une faute à une équipe")

    choix = int(input("Veuillez faire votre choix: "))

    if choix == 1:
      
        print(f"\nLe meilleur coureur est dans l'équipe {meilleur_temps} et son temps" \
              f" étant de {min(liste_equipe[meilleur_temps])}\n")          
        print(f"Moyenne des equipes: {(liste_sorted)}")

    elif choix == 2:
        
        # Permet de sauvegarder les données dans un fichier externe
        sauvegarde_stat = open("stats.txt", "w", encoding='utf8')
        sauvegarde_stat.write(f"{meilleur_temps}")
        sauvegarde_stat.write(f"Moyennes des equipes:\n" \
                              f"{liste_sorted}")
        sauvegarde_stat.close()
     
    elif choix == 3:

        equipeA_moyenne = sum(liste_equipe['A']) / len(liste_equipe['A'])
        equipeB_moyenne = sum(liste_equipe['B']) / len(liste_equipe['B'])
        equipeC_moyenne = sum(liste_equipe['C']) / len(liste_equipe['C'])

        # Calcul pour écart-type pour chaque
        pow_data_avg_equipeA = [(pow(liste_equipe['A'][0] - equipeA_moyenne, 2)), \
                                (pow(liste_equipe['A'][1] - equipeA_moyenne, 2)), \
                                (pow(liste_equipe['A'][2] - equipeA_moyenne, 2)), \
                                (pow(liste_equipe['A'][3] - equipeA_moyenne, 2)), \
                                (pow(liste_equipe['A'][4] - equipeA_moyenne, 2))]
        calcul_ecart_type_equipeA = math.sqrt(sum(pow_data_avg_equipeA)/5)
        
        pow_data_avg_equipeB = [(pow(liste_equipe['B'][0] - equipeB_moyenne, 2)), \
                                (pow(liste_equipe['B'][1] - equipeB_moyenne, 2)), \
                                (pow(liste_equipe['B'][2] - equipeB_moyenne, 2)), \
                                (pow(liste_equipe['B'][3] - equipeB_moyenne, 2)), \
                                (pow(liste_equipe['B'][4] - equipeB_moyenne, 2))]
        calcul_ecart_type_equipeB = math.sqrt(sum(pow_data_avg_equipeB)/5)
        
        pow_data_avg_equipeC = [(pow(liste_equipe['C'][0] - equipeC_moyenne, 2)), \
                                (pow(liste_equipe['C'][1] - equipeC_moyenne, 2)), \
                                (pow(liste_equipe['C'][2] - equipeC_moyenne, 2)), \
                                (pow(liste_equipe['C'][3] - equipeC_moyenne, 2)), \
                                (pow(liste_equipe['C'][4] - equipeC_moyenne, 2))]
        calcul_ecart_type_equipeC = math.sqrt(sum(pow_data_avg_equipeC)/5) 

        dicotionnaire_ecart_type_equipe = {'A' : calcul_ecart_type_equipeA, 'B' : calcul_ecart_type_equipeB, 'C' : calcul_ecart_type_equipeC}
        cle_min_ecart_type_equipe = min(dicotionnaire_ecart_type_equipe, key=dicotionnaire_ecart_type_equipe.get)

        print(f"Le plus petit écart type est l'équipe {cle_min_ecart_type_equipe} avec "
              f"{dicotionnaire_ecart_type_equipe[cle_min_ecart_type_equipe]:.3f}\n")                              
        

    elif choix == 4:

        # Ouverte de fichir pour une ajout d'information
        ajout_faute = open("stats.txt", "a", encoding='utf8')

        selection_equipe_faute = int(input("Liste des équipes: \n" \
                                           "1 pour Équipe A \n" \
                                           "2 pour Équipe B \n" \
                                           "3 pour Équipe C \n" \
                                           "4 pour Toutes les équipes \n" \
                                           "Choisissez pour qui vous voulez attribuer une faute?:"))
        if selection_equipe_faute == 1:
            ajout_faute.write("\n1 faute pour l'équipe A")
        elif selection_equipe_faute == 2:
            ajout_faute.write("\n1 faute pour l'équipe B")
        elif selection_equipe_faute == 3:
            ajout_faute.write("\n1 faute pour l'équipe C")
        elif selection_equipe_faute == 4:
            ajout_faute.write("\n1 faute pour toutes les équipes")
        else:
            print("Entrez invalide")
    else:
        print("Mauvais choix")
    return

# Exécution de fonction avec variable comme argument.
# La variable donne accès à des données d'un dictionnaire
# À l'aide d'une Fonction
execution_user(liste_equipe)