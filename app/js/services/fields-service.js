﻿(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.service('FieldsService', FieldsService);

    function FieldsService($http, ProtoFieldFactory) {
        var sectors = [{ 'id': 1, 'label': "Salarié du secteur privé" }, { 'id': 2, 'label': "Salarié du secteur public" }, { 'id': 3, 'label': "Secteur agricole" }, { 'id': 11, 'label': "Indépendant / Travailleurs non salariés" }, { 'id': 6, 'label': "Retraité" }, { 'id': 10, 'label': "Autres" }],
            professions = [{ 'id': 1, "IdSecteur": 1, 'label': "Cadre supérieur", "ContratTravail": true, "DateDebut": true }, { 'id': 2, "IdSecteur": 1, 'label': "Ingénieur", "ContratTravail": true, "DateDebut": true }, { 'id': 3, "IdSecteur": 1, 'label': "Cadre moyen", "ContratTravail": true, "DateDebut": true }, { 'id': 4, "IdSecteur": 1, 'label': "Technicien", "ContratTravail": true, "DateDebut": true }, { 'id': 5, "IdSecteur": 1, 'label': "Contremaître - Agent de maîtrise", "ContratTravail": true, "DateDebut": true }, { 'id': 6, "IdSecteur": 1, 'label': "Agent de sécurité", "ContratTravail": true, "DateDebut": true }, { 'id': 7, "IdSecteur": 1, 'label': "Employé de commerce", "ContratTravail": true, "DateDebut": true }, { 'id': 8, "IdSecteur": 1, 'label': "Assistante maternelle - Employée de maison", "ContratTravail": true, "DateDebut": true }, { 'id': 9, "IdSecteur": 1, 'label': "Employé de bureau", "ContratTravail": true, "DateDebut": true }, { 'id': 10, "IdSecteur": 1, 'label': "Vendeur - Caissier de magasin", "ContratTravail": true, "DateDebut": true }, { 'id': 11, "IdSecteur": 1, 'label': "Ouvrier", "ContratTravail": true, "DateDebut": true }, { 'id': 12, "IdSecteur": 1, 'label': "Représentant salarié", "ContratTravail": true, "DateDebut": true }, { 'id': 13, "IdSecteur": 1, 'label': "Chauffeur et livreur", "ContratTravail": true, "DateDebut": true }, { 'id': 14, "IdSecteur": 2, 'label': "Cadre supérieur et professeur", "ContratTravail": true, "DateDebut": true }, { 'id': 15, "IdSecteur": 2, 'label': "Cadre moyen et instituteur", "ContratTravail": true, "DateDebut": true }, { 'id': 16, "IdSecteur": 2, 'label': "Infirmière et profession para-médicale", "ContratTravail": true, "DateDebut": true }, { 'id': 17, "IdSecteur": 2, 'label': "Employé et agent administratif", "ContratTravail": true, "DateDebut": true }, { 'id': 18, "IdSecteur": 2, 'label': "Agent de service", "ContratTravail": true, "DateDebut": true }, { 'id': 19, "IdSecteur": 2, 'label': "Ouvrier d'état", "ContratTravail": true, "DateDebut": true }, { 'id': 20, "IdSecteur": 2, 'label': "Militaire - Gendarme - Policier - Pompier", "ContratTravail": true, "DateDebut": true }, { 'id': 21, "IdSecteur": 2, 'label': "Aide soignant hospitalier", "ContratTravail": true, "DateDebut": true }, { 'id': 22, "IdSecteur": 3, 'label': "Propriétaire agricole", "ContratTravail": false, "DateDebut": true }, { 'id': 23, "IdSecteur": 3, 'label': "Salarié agricole", "ContratTravail": true, "DateDebut": true }, { 'id': 24, "IdSecteur": 11, 'label': "Commerçant", "ContratTravail": false, "DateDebut": true }, { 'id': 25, "IdSecteur": 11, 'label': "Artisan", "ContratTravail": false, "DateDebut": true }, { 'id': 26, "IdSecteur": 11, 'label': "Profession libérale", "ContratTravail": false, "DateDebut": true }, { 'id': 27, "IdSecteur": 11, 'label': "VRP sans fixe", "ContratTravail": false, "DateDebut": true }, { 'id': 28, "IdSecteur": 11, 'label': "Infirmière et cadre moyen du secteur médical", "ContratTravail": false, "DateDebut": true }, { 'id': 29, "IdSecteur": 11, 'label': "Profession libérale médicale et para-médicale", "ContratTravail": false, "DateDebut": true }, { 'id': 30, "IdSecteur": 10, 'label': "Etudiant", "ContratTravail": false, "DateDebut": false }, { 'id': 31, "IdSecteur": 6, 'label': "Retraité du secteur privé", "ContratTravail": false, "DateDebut": true }, { 'id': 32, "IdSecteur": 6, 'label': "Retraité du secteur public", "ContratTravail": false, "DateDebut": true }, { 'id': 33, "IdSecteur": 10, 'label': "Demandeur d'emploi", "ContratTravail": false, "DateDebut": false }, { 'id': 34, "IdSecteur": 10, 'label': "Pensionné", "ContratTravail": false, "DateDebut": false }, { 'id': 35, "IdSecteur": 10, 'label': "Sans profession - Sans emploi", "ContratTravail": false, "DateDebut": false }, { 'id': 36, "IdSecteur": 11, 'label': "Intermittent / Professionnel du spectacle", "ContratTravail": false, "DateDebut": false }, { 'id': 37, "IdSecteur": 11, 'label': "Autoentrepreneur", "ContratTravail": false, "DateDebut": true }, { 'id': 38, "IdSecteur": 11, 'label': "Chef d’entreprise de 5 salariés ou +", "ContratTravail": false, "DateDebut": true }],
            logements = [{ "id": 1, "label": "Locataire", "DateDebut": true }, { "id": 2, "label": "Propriétaire (avec crédit immobilier en cours)", "DateDebut": true }, { "id": 3, "label": "Propriétaire (sans crédit immobilier en cours)", "DateDebut": true }, { "id": 4, "label": "Logé par l'employeur", "DateDebut": true }, { "id": 5, "label": "Logé par l'administration", "DateDebut": true }, { "id": 6, "label": "Logé par parents ou enfants", "DateDebut": true }, { "id": 9, "label": "Logé par conjoint", "DateDebut": true }, { "id": 10, "label": "Logé par un autre membre de la famille", "DateDebut": true }, { "id": 7, "label": "Logé par un ami ou en sous-location", "DateDebut": true }, { "id": 8, "label": "Sans domicile fixe (Hôtel...)", "DateDebut": false }],
            contrats = [{ "id": 1, "label": "CDI", "DateDebut": true, "DateFin": false, "Ordre": 0 }, { "id": 3, "label": "CDD", "DateDebut": true, "DateFin": true, "Ordre": 1 }, { "id": 4, "label": "Intérimaire", "DateDebut": true, "DateFin": false, "Ordre": 2 }, { "id": 2, "label": "Contrat initiative emploi à durée indéterminée", "DateDebut": true, "DateFin": false, "Ordre": 3 }, { "id": 8, "label": "Contrat initiative emploi à durée déterminée", "DateDebut": true, "DateFin": false, "Ordre": 4 }, { "id": 5, "label": "Contrat emploi jeune", "DateDebut": true, "DateFin": false, "Ordre": 5 }, { "id": 6, "label": "Contrat d'accompagnement dans l'emploi", "DateDebut": true, "DateFin": false, "Ordre": 6 }, { "id": 7, "label": "CNE", "DateDebut": true, "DateFin": false, "Ordre": 7 }, { "id": 9, "label": "Contrat jeune en entreprise", "DateDebut": true, "DateFin": false, "Ordre": 8 }],
            dettes_labels = [{ "id": 10, "label": "Auto-Moto" }, { "id": 14, "label": "Prêt personnel" }, { "id": 15, "label": "Crédit renouvelable" }, { "id": 16, "label": "Paiement en plusieurs fois" }, { "id": 17, "label": "Travaux" }, { "id": 18, "label": "Prêt employeur" }, { "id": 11, "label": "Autres" }],
        fields = [
  {
      "name": "Etape1_Client_SituationFamilialeId",
      "label": "Situation familiale",
      "group": "I. Situation personnelle",
      "type": "select",
      "subtype": "select",
      "hasCoClient":[2,4],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": [
        {
            "id": 1,
            "label": "Célibataire"
        },
        {
            "id": 2,
            "label": "Marié"
        },
        {
            "id": 3,
            "label": "Divorcé"
        },
        {
            "id": 4,
            "label": "Vie marital / PACS"
        },
        {
            "id": 5,
            "label": "Veuf(ve)"
        },
        {
            "id": 6,
            "label": "Séparé"
        }
      ],
      "nextField": true,
      "autoChange": true
  },
  {
      "name": "Etape1_DejaMarie",
      "label": "Précédemment marié(e) ",
      "group": "I. Situation personnelle",
      "type": "yesno",
      "subtype": "input",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "yesLabel": "Oui",
      "noLabel": "Non",
      "yesValue": "true",
      "noValue": "false",
      "hidden": true,
      "binds": [
        {
            "name": "Etape1_Client_SituationFamilialeId",
            "values": [6]
        }
      ],
      "nextField": true,
      "autoChange": true
  },
  {
      "name": "Etape1_JugementDivorce",
      "label": "Jugement de divorce",
      "group": "I. Situation personnelle",
      "type": "yesno",
      "subtype": "input",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "tooltip": "Vous disposez d'un jugement de divorce ou d'une ordonnance de non conciliation.",
      "yesLabel": "Oui",
      "noLabel": "Non",
      "yesValue": "true",
      "noValue": "false",
      "hidden": true,
      "binds": [
        {
            "name": "Etape1_Client_SituationFamilialeId",
            "values": [3]
        },
        {
            "name": "Etape1_DejaMarie",
            "values": ['true']
        }
      ],
      "nextField": true,
      "autoChange": true
  },
  {
      "name": "Etape1_Client_NbEnfantACharge",
      "label": "Nombre d'enfants à charge",
      "group": "I. Situation personnelle",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": [
        {
            "id": 0,
            "label": "0"
        },
        {
            "id": 1,
            "label": "1"
        },
        {
            "id": 2,
            "label": "2"
        },
        {
            "id": 3,
            "label": "3"
        },
        {
            "id": 4,
            "label": "4"
        },
        {
            "id": 5,
            "label": "5"
        },
        {
            "id": 6,
            "label": "6"
        },
        {
            "id": 7,
            "label": "7"
        },
        {
            "id": 8,
            "label": "8"
        },
        {
            "id": 9,
            "label": "9 ou plus"
        }
      ],
      "nextField": true,
      "autoChange": true,
      "tooltip": "Prenant en compte uniquement les enfants qui sont rattachés à votre foyer fiscal."
  }, {
      "name": "Etape2_Client_Residence_TypeId",
      "label": "Logement",
      "group": "I. Situation personnelle",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": logements,
      "nextField": true,
      "autoChange": true
  },
        {
            "name": "Etape2_Client_Residence_Date",
            "label": "Date d'arrivée dans votre logement",
            "group": "I. Situation personnelle",
            "value": "",
            "type": "month",
            "subtype": "input",
            "minyear": 1945,
            "maxyear": 2016,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de respecter le format : MM/AAAA",
            "minyearMessage": "La date doit etre postérieure à 1945",
            "maxyearMessage": "La date doit etre antérieure à 2016",
            "hidden": true,
            "binds": [
            {
                "name": "Etape2_Client_Residence_TypeId",
                "regexp": "[1-7]"
            }],
            "nextField": true,
            "autoChange": true
        },
        {
            "name": "Etape2_Client_Activite_SecteurId",
            "label": "Secteur d'activité",
            "group": "II. Situation professionnelle",
            "value": "",
            "values": sectors,
            "type": "select",
            "subtype": "select",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "filters": {
                "Etape2_Client_Activite_ProfessionId": "IdSecteur"
            },
            "nextField": true,
            "autoChange": true
        },
        {
            "name": "Etape2_Client_Activite_ProfessionId",
            "label": "Profession",
            "group": "II. Situation professionnelle",
            "value": "",
            "values": professions,
            "type": "select",
            "subtype": "select",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "hidden": true,
            "nextField": true,
            "autoChange": true,
            "binds": [{
                "name": "Etape2_Client_Activite_SecteurId",
                "values": [
                    "*"
                ]
            }],
        },
        {
            "name": "Etape2_Client_Activite_TypeContratTravailId",
            "label": "Contrat de travail",
            "group": "II. Situation professionnelle",
            "value": "",
            "values": contrats,
            "type": "select",
            "subtype": "select",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "hidden": true,
            "nextField": true,
            "autoChange": true,
            "binds": [{
                "name": "Etape2_Client_Activite_ProfessionId",
                "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23]
            }],
        },
        {
            "name": "Formulaire_E_DebutContratTravailDate",
            "label": "Date d'embauche",
            "group": "II. Situation professionnelle",
            "value": "",
            "type": "month",
            "subtype": "input",
            "minyear": 1945,
            "maxyear": 2016,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de respecter le format : MM/AAAA",
            "minyearMessage": "La date doit etre postérieure à 1945",
            "maxyearMessage": "La date doit etre antérieure à 2016",
            "hidden": true,
            "binds": [
            {
                "name": "Etape2_Client_Activite_ProfessionId",
                "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 36]
            }],
            "nextField": true,
            "autoChange": true,
            "tooltip": "Chez le même employeur depuis."
        },
        {
            "name": "Formulaire_E_DebutContratTravailDate2",
            "label": "Date de création de votre société",
            "group": "II. Situation professionnelle",
            "value": "",
            "type": "month",
            "subtype": "input",
            "minyear": 1945,
            "maxyear": 2016,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de respecter le format : MM/AAAA",
            "minyearMessage": "La date doit etre postérieure à 1945",
            "maxyearMessage": "La date doit etre antérieure à 2016",
            "hidden": true,
            "binds": [
            {
                "name": "Etape2_Client_Activite_ProfessionId",
                "values": [22, 24, 25, 26, 27, 28, 29, 37, 38]
            }],
            "nextField": true,
            "autoChange": true,
            "tooltip": "Date de création de la société que  vous gérez ou dirigez."
        },
  {
      "name": "Etape2_Client_LiquidationOuProcedure",
      "label": "Liquidation judicaire",
      "group": "II. Situation professionnelle",
      "type": "yesno",
      "subtype": "input",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "yesLabel": "Oui",
      "noLabel": "Non",
      "yesValue": "true",
      "noValue": "false",
      "hidden": true,
      "binds": [
        {
            "name": "Etape2_Client_Activite_ProfessionId",
            "values": [22, 24, 25, 26, 27, 28, 29, 37, 38]
        }
      ],
      "nextField": true,
      "autoChange": true,
      "tooltip": "Une de vos sociétés est en liquidation ou en procédure collective."
  },
        {
            "name": "Formulaire_E_DebutContratTravailDate3",
            "label": "Date de départ à la retraite",
            "group": "II. Situation professionnelle",
            "value": "",
            "type": "month",
            "subtype": "input",
            "minyear": 1945,
            "maxyear": 2016,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de respecter le format : MM/AAAA",
            "minyearMessage": "La date doit etre postérieure à 1945",
            "maxyearMessage": "La date doit etre antérieure à 2016",
            "hidden": true,
            "binds": [
            {
                "name": "Etape2_Client_Activite_ProfessionId",
                "values": [31, 32]
            }],
            "nextField": true,
            "autoChange": true
        },
        {
            "name": "CEtape2_Client_Activite_SecteurId",
            "label": "Secteur d'activité du  conjoint",
            "group": "II. Situation professionnelle",
            "value": "",
            "values": sectors,
            "type": "select",
            "subtype": "select",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "filters": {
                "CEtape2_Client_Activite_ProfessionId": "IdSecteur"
            },
            "nextField": true,
            "autoChange": true,
            "coClient": true
        },
        {
            "name": "CEtape2_Client_Activite_ProfessionId",
            "label": "Profession du conjoint",
            "group": "II. Situation professionnelle",
            "value": "",
            "values": professions,
            "type": "select",
            "subtype": "select",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "hidden": true,
            "binds": [{
                "name": "CEtape2_Client_Activite_SecteurId",
                "values": [
                    "*"
                ]
            }],
            "nextField": true,
            "autoChange": true,
            "coClient": true
        },
        {
            "name": "CEtape2_Client_Activite_TypeContratTravailId",
            "label": "Contrat de travail du conjoint",
            "group": "II. Situation professionnelle",
            "value": "",
            "values": contrats,
            "type": "select",
            "subtype": "select",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "hidden": true,
            "binds": [{
                "name": "CEtape2_Client_Activite_ProfessionId",
                "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23]
            }],
            "nextField": true,
            "autoChange": true,
            "coClient": true
        },
        {
            "name": "CFormulaire_E_DebutContratTravailDate",
            "label": "Date d'embauche du conjoint",
            "group": "II. Situation professionnelle",
            "value": "",
            "type": "month",
            "subtype": "input",
            "minyear": 1945,
            "maxyear": 2016,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de respecter le format : MM/AAAA",
            "minyearMessage": "La date doit etre postérieure à 1945",
            "maxyearMessage": "La date doit etre antérieure à 2016",
            "hidden": true,
            "binds": [
            {
                "name": "CEtape2_Client_Activite_ProfessionId",
                "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 36]
            }],
            "nextField": true,
            "autoChange": true,
            "tooltip": "Date d'entrée de votre conjoint chez son employeur actuel.",
            "coClient": true
        },
        {
            "name": "CFormulaire_E_DebutContratTravailDate2",
            "label": "Création de la société du conjoint",
            "group": "II. Situation professionnelle",
            "value": "",
            "type": "month",
            "subtype": "input",
            "minyear": 1945,
            "maxyear": 2016,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de respecter le format : MM/AAAA",
            "minyearMessage": "La date doit etre postérieure à 1945",
            "maxyearMessage": "La date doit etre antérieure à 2016",
            "hidden": true,
            "binds": [
            {
                "name": "CEtape2_Client_Activite_ProfessionId",
                "values": [22, 24, 25, 26, 27, 28, 29, 37, 38]
            }],
            "nextField": true,
            "autoChange": true,
            "tooltip": "Date de création de la société que votre conjoint gére ou dirige.",
            "coClient": true
        },
  {
      "name": "CEtape2_Client_LiquidationOuProcedure",
      "label": "Liquidation judicaire",
      "group": "II. Situation professionnelle",
      "type": "yesno",
      "subtype": "input",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "yesLabel": "Oui",
      "noLabel": "Non",
      "yesValue": "true",
      "noValue": "false",
      "hidden": true,
      "binds": [
        {
            "name": "CEtape2_Client_Activite_ProfessionId",
            "values": [22, 24, 25, 26, 27, 28, 29, 37, 38]
        }
      ],
      "nextField": true,
      "autoChange": true,
      "tooltip": "Une des sociétés de votre conjoint est en liquidation ou en procédure collective.",
      "coClient": true
  },
        {
            "name": "CFormulaire_E_DebutContratTravailDate3",
            "label": "Date de retraite du conjoint",
            "group": "II. Situation professionnelle",
            "value": "",
            "type": "month",
            "subtype": "input",
            "minyear": 1945,
            "maxyear": 2016,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de respecter le format : MM/AAAA",
            "minyearMessage": "La date doit etre postérieure à 1945",
            "maxyearMessage": "La date doit etre antérieure à 2016",
            "hidden": true,
            "binds": [
            {
                "name": "CEtape2_Client_Activite_ProfessionId",
                "values": [31, 32]
            }],
            "nextField": true,
            "autoChange": true,
            "coClient": true
        }, {
            "name": "Etape3_Client_Revenus_Salaire",
            "label": "Salaire",
            "group": "III. Vos revenus",
            "type": "money",
            "subtype": "input",
            "hidden": true,
            "binds": [
              {
                  "name": "Etape2_Client_Activite_ProfessionId",
                  "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 35, 36, 37, 38]
              }
            ],
            "minvalue": 1,
            "maxvalue": 1000000,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de ne saisir que des chiffres",
            "minvalueMessage": "Votre salaire ne peut être inférieur à 1€",
            "maxvalueMessage": "Votre salaire ne peut être supérieur à 1000000€",
            "nextField": true,
            "tooltip": "Votre salaire mensuel net."
        }, {
            "name": "Etape3_Client_Revenus_Salaire_Retraite",
            "label": "Retraite",
            "group": "III. Vos revenus",
            "type": "money",
            "subtype": "input",
            "hidden": true,
            "binds": [
              {
                  "name": "Etape2_Client_Activite_ProfessionId",
                  "values": [31, 32]
              }
            ],
            "minvalue": 1,
            "maxvalue": 1000000,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de ne saisir que des chiffres",
            "minvalueMessage": "Votre retraite ne peut être inférieure à 1€",
            "maxvalueMessage": "Votre retraite ne peut être supérieure à 1000000€",
            "nextField": true,
            "tooltip": "Votre retraite mensuelle nette."
        }, {
            "name": "CEtape3_Client_Revenus_Salaire",
            "label": "Salaire du conjoint",
            "group": "III. Vos revenus",
            "type": "money",
            "subtype": "input",
            "hidden": true,
            "binds": [
              {
                  "name": "CEtape2_Client_Activite_ProfessionId",
                  "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 35, 36, 37, 38]
              }
            ],
            "minvalue": 1,
            "maxvalue": 1000000,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de ne saisir que des chiffres",
            "minvalueMessage": "Le salaire de votre conjoint ne peut être inférieur à 1€",
            "maxvalueMessage": "La salaire de votre conjoint ne peut être supérieur à 1000000€",
            "tooltip": "Le salaire mensuel net de votre conjoint.",
            "nextField": true,
            "coClient": true
        }, {
            "name": "CEtape3_Client_Revenus_Salaire_Retraite",
            "label": "Retraire du conjoint",
            "group": "III. Vos revenus",
            "type": "money",
            "subtype": "input",
            "hidden": true,
            "binds": [
              {
                  "name": "CEtape2_Client_Activite_ProfessionId",
                  "values": [31, 32]
              }
            ],
            "minvalue": 1,
            "maxvalue": 1000000,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de ne saisir que des chiffres",
            "minvalueMessage": "La retraite de votre conjoint ne peut être inférieure à 1€",
            "maxvalueMessage": "La retraite de votre conjoint ne peut être supérieure à 1000000€",
            "tooltip": "La retraite mensuelle nette de votre conjoint.",
            "nextField": true,
            "coClient": true
        }, {
            "name": "Etape3_Client_Revenus_AllocationOuAideLogement",
            "label": "Aide au logement",
            "group": "III. Vos revenus",
            "type": "money",
            "subtype": "input",
            "minvalue": 0,
            "maxvalue": 1000000,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de ne saisir que des chiffres",
            "minvalueMessage": "L'aide au logement ne peut être inférieure à 0€",
            "maxvalueMessage": "L'aide au logement ne peut être supérieure à 1000000€",
            "nextField": true,
            "tooltip": "Si vous ne percevez pas d'aides au logement, merci de renseigner 0 pour passer à la question suivante."
        }, {
            "name": "Etape3_Client_Revenus_PrestationFamiliale",
            "label": "Prestations familiales",
            "group": "III. Vos revenus",
            "type": "money",
            "subtype": "input",
            "minvalue": 0,
            "maxvalue": 1000000,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de ne saisir que des chiffres",
            "minvalueMessage": "La prestation ne peut être inférieure à 0€",
            "maxvalueMessage": "La prestation ne peut être supérieure à 1000000€",
            "nextField": true,
            "tooltip": "Si vous ne percevez pas de prestations familiales, merci de renseigner 0 pour passer à la question suivante."
        }, {
            "name": "Etape3_Client_Revenus_AutresRevenus",
            "label": "Autres revenus",
            "group": "III. Vos revenus",
            "type": "money",
            "subtype": "input",
            "minvalue": 0,
            "maxvalue": 1000000,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de ne saisir que des chiffres",
            "minvalueMessage": "Le revenu ne peut être inférieur à 0€",
            "maxvalueMessage": "Le revenu ne peut être supérieur à 1000000€",
            "nextField": true,
            "tooltip": "Si vous ne percevez pas d'autres revenus que ceux précédemment mentionnés, merci de renseigner 0 pour passer à la question suivante."
        }, {
            "name": "Etape3_Client_Revenus_PensionPercues",
            "label": "Pension",
            "group": "III. Vos revenus",
            "type": "money",
            "subtype": "input",
            "minvalue": 0,
            "maxvalue": 1000000,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de ne saisir que des chiffres",
            "minvalueMessage": "La pension ne peut être inférieure à 0€",
            "maxvalueMessage": "La pension ne peut être supérieure à 1000000€",
            "nextField": true,
            "tooltip": "Si vous ne percevez pas de pension (réversion, invalidité), merci de renseigner 0 pour passer à la question suivante."
        }, {
            "name": "Etape3_Client_Revenus_IndemnitesPercues",
            "label": "Indemnités Sécurité Sociale",
            "group": "III. Vos revenus",
            "type": "money",
            "subtype": "input",
            "minvalue": 0,
            "maxvalue": 1000000,
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "parseMessage": "Merci de ne saisir que des chiffres",
            "minvalueMessage": "L'indemnité ne peut être inférieure à 0€",
            "maxvalueMessage": "L'indemnité ne peut être supérieure à 1000000€",
            "nextField": true,
            "tooltip": "Si vous ne percevez pas d'indemnités de la Sécurité Sociale, merci de renseigner 0 pour passer à la question suivante."
        },
  {
      "name": "Etape3_Client_Revenus_ArretMaladieDurant3DerniersMois",
      "label": "Arrêt maladie",
      "group": "III. Vos revenus",
      "type": "yesno",
      "subtype": "input",
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Revenus_IndemnitesPercues",
            "superior": 0
        }
      ],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "yesLabel": "Oui",
      "noLabel": "Non",
      "yesValue": "true",
      "noValue": "false",
      "nextField": true,
      "autoChange": true,
      "tooltip": "Vous avez eu au moins 30 jours d'arrêt maladie au cours des 3 derniers mois."
  }, {
      "name": "Etape3_Client_Charges_Loyer",
      "label": "Loyer",
      "group": "IV. Vos charges",
      "type": "money",
      "subtype": "input",
      "minvalue": 1,
      "maxvalue": 1000000,
      "hidden": true,
      "binds": [
        {
            "name": "Etape2_Client_Residence_TypeId",
            "values": [1, 4, 5, 6, 9, 10, 7]
        }
      ],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "parseMessage": "Merci de ne saisir que des chiffres",
      "nextField": true,
      "minvalueMessage": "Le loyer ne peut être inférieur à 0€",
      "maxvalueMessage": "Le loyer ne peut être supérieur à 1000000€",
      "tooltip": "Hors APL."
  }, {
      "name": "Etape3_Client_Charges_PretImmo",
      "label": "Prêt immobilier",
      "group": "IV. Vos charges",
      "type": "money",
      "subtype": "input",
      "minvalue": 1,
      "maxvalue": 1000000,
      "hidden": true,
      "binds": [
        {
            "name": "Etape2_Client_Residence_TypeId",
            "values": [2]
        }
      ],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "parseMessage": "Merci de ne saisir que des chiffres",
      "minvalueMessage": "Le prêt ne peut être inférieur à 1€",
      "maxvalueMessage": "Le prêt ne peut être supérieur à 1000000€",
      "nextField": true,
      "tooltip": "Montant remboursé chaque mois pour ce prêt."
  }, {
      "name": "Etape3_Client_Charges_Pension",
      "label": "Pension alimentaire versée",
      "group": "IV. Vos charges",
      "type": "money",
      "subtype": "input",
      "minvalue": 0,
      "maxvalue": 1000000,
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "parseMessage": "Merci de ne saisir que des chiffres",
      "minvalueMessage": "La pension ne peut être inférieure à 0€",
      "maxvalueMessage": "La pension ne peut être supérieure à 1000000€",
      "nextField": true,
      "tooltip": "Si vous ne versez pas de pension alimentaire chaque mois, merci de renseigner 0 pour passer à la question suivante."
  },
  {
      "name": "Etape3_Client_Charges_Dettes",
      "label": "D'autres crédits en cours",
      "group": "IV. Vos charges",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": [
        {
            "id": 0,
            "label": "0"
        },
        {
            "id": 1,
            "label": "1"
        },
        {
            "id": 2,
            "label": "2"
        },
        {
            "id": 3,
            "label": "3"
        },
        {
            "id": 4,
            "label": "4"
        },
        {
            "id": 5,
            "label": "5"
        }
      ],
      "nextField": true,
      "autoChange": true,
      "tooltip": "Vos autres crédits en cours (auto, travaux, crédit renouvelable, prêt personnel…).",
      "oddValues": [0],
      "oddMessage":" L'oubli de déclaration d'un crédit conduit généralement à un refus : déclarez bien tous vos crédits, merci."
  },
  {
      "name": "Etape3_Client_Charges_Dettes[0].Id",
      "label": "Type de crédit n°1",
      "group": "IV. Vos charges",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": dettes_labels,
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 0
        }
      ],
      "nextField": true,
      "autoChange": true
  }, {
      "name": "Etape3_Client_Charges_Dettes[0].Label",
      "label": "Mensualité du crédit n°1",
      "group": "IV. Vos charges",
      "type": "money",
      "subtype": "input",
      "minvalue": 1,
      "maxvalue": 1000000,
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 0
        }
      ],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "parseMessage": "Merci de ne saisir que des chiffres",
      "minvalueMessage": "La mensualité ne peut être inférieure à 1€",
      "maxvalueMessage": "La mensualité ne peut être supérieure à 1000000€",
      "nextField": true,
      "tooltip": "Montant remboursé chaque mois pour ce prêt."
  },
  {
      "name": "Etape3_Client_Charges_Dettes[1].Id",
      "label": "Type de crédit n°2",
      "group": "IV. Vos charges",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": dettes_labels,
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 1
        }
      ],
      "nextField": true,
      "autoChange": true
  }, {
      "name": "Etape3_Client_Charges_Dettes[1].Label",
      "label": "Mensualité du crédit n°2",
      "group": "IV. Vos charges",
      "type": "money",
      "subtype": "input",
      "minvalue": 1,
      "maxvalue": 1000000,
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 1
        }
      ],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "parseMessage": "Merci de ne saisir que des chiffres",
      "minvalueMessage": "La mensualité ne peut être inférieure à 1€",
      "maxvalueMessage": "La mensualité ne peut être supérieure à 1000000€",
      "nextField": true,
      "tooltip": "Montant remboursé chaque mois pour ce prêt."
  },
  {
      "name": "Etape3_Client_Charges_Dettes[2].Id",
      "label": "Type de crédit n°3",
      "group": "IV. Vos charges",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": dettes_labels,
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 2
        }
      ],
      "nextField": true,
      "autoChange": true
  }, {
      "name": "Etape3_Client_Charges_Dettes[2].Label",
      "label": "Mensualité du crédit n°3",
      "group": "IV. Vos charges",
      "type": "money",
      "subtype": "input",
      "minvalue": 1,
      "maxvalue": 1000000,
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 2
        }
      ],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "parseMessage": "Merci de ne saisir que des chiffres",
      "minvalueMessage": "La mensualité ne peut être inférieure à 1€",
      "maxvalueMessage": "La mensualité ne peut être supérieure à 1000000€",
      "nextField": true,
      "tooltip": "Montant remboursé chaque mois pour ce prêt."
  },
  {
      "name": "Etape3_Client_Charges_Dettes[3].Id",
      "label": "Type de crédit n°4",
      "group": "IV. Vos charges",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": dettes_labels,
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 3
        }
      ],
      "nextField": true,
      "autoChange": true
  }, {
      "name": "Etape3_Client_Charges_Dettes[3].Label",
      "label": "Mensualité du crédit n°4",
      "group": "IV. Vos charges",
      "type": "money",
      "subtype": "input",
      "minvalue": 1,
      "maxvalue": 1000000,
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 3
        }
      ],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "parseMessage": "Merci de ne saisir que des chiffres",
      "minvalueMessage": "La mensualité ne peut être inférieure à 1€",
      "maxvalueMessage": "La mensualité ne peut être supérieure à 1000000€",
      "nextField": true,
      "tooltip": "Montant remboursé chaque mois pour ce prêt."
  },
  {
      "name": "Etape3_Client_Charges_Dettes[4].Id",
      "label": "Type de crédit n°5",
      "group": "IV. Vos charges",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": dettes_labels,
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 4
        }
      ],
      "nextField": true,
      "autoChange": true
  }, {
      "name": "Etape3_Client_Charges_Dettes[4].Label",
      "label": "Mensualité du crédit n°5",
      "group": "IV. Vos charges",
      "type": "money",
      "subtype": "input",
      "minvalue": 1,
      "maxvalue": 1000000,
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 4
        }
      ],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "parseMessage": "Merci de ne saisir que des chiffres",
      "minvalueMessage": "La mensualité ne peut être inférieure à 1€",
      "maxvalueMessage": "La mensualité ne peut être supérieure à 1000000€",
      "nextField": true,
      "tooltip": "Montant remboursé chaque mois pour ce prêt."
  }, {
      "name": "Etape3_Rachat",
      "label": "Remboursement des crédits en cours",
      "group": "IV. Vos charges",
      "type": "yesno",
      "subtype": "input",
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 0
        }
      ],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "yesLabel": "Oui",
      "noLabel": "Non",
      "yesValue": "true",
      "noValue": "false",
      "nextField": true,
      "autoChange": true,
      "tooltip": "Vous souhaitez consacrer la majorité du prêt demandé à rembourser d'autres crédits."
  }, {
      "name": "Etape3_Dette",
      "label": "Retards de paiement crédits en cours",
      "group": "IV. Vos charges",
      "type": "yesno",
      "subtype": "input",
      "hidden": true,
      "binds": [
        {
            "name": "Etape3_Client_Charges_Dettes",
            "superior": 0
        }
      ],
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "yesLabel": "Oui",
      "noLabel": "Non",
      "yesValue": "true",
      "noValue": "false",
      "nextField": true,
      "autoChange": true,
      "tooltip": "Vous avez actuellement des retards de paiement dans vos crédits en cours de remboursement."
  },
  {
      "name": "Etape3_Client_BanqueId",
      "label": "Domiciliation bancaire",
      "group": "V. Votre banque",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": [
           { "id": 2, "label": "La Banque Postale" },
               { "id": 1, "label": "Crédit Agricole" },
            { "id": 4, "label": "Caisse d'Epargne" },
             { "id": 5, "label": "Société Générale" },
              { "id": 8, "label": "Crédit Mutuel" },
               { "id": 7, "label": " BNP Paribas" },
                { "id": 3, "label": "Banque Populaire" },
         { "id": 6, "label": "Crédit Lyonnais" },
         { "id": 11, "label": "CIC" },
         { "id": 12, "label": "HSBC" },
         { "id": 13, "label": "Boursorama" },
         { "id": 14, "label": "Fortuneo" },
         { "id": 9, "label": "Autre banque" },
         { "id": 10, "label": "Pas de banque" }
      ],
      "nextField": true,
      "autoChange": true,
      "tooltip": "Banque où vos revenus sont domiciliés."
  },
        {
            "name": "Etape3_Client_Banque_Depuis",
            "label": "Année d'ouverture du compte",
            "group": "V. Votre banque",
            "value": "",
            "type": "year",
            "subtype": "input",
            "minyear": 1945,
            "maxyear": 2016,
            "minyearMessage": "La date doit etre postérieure à 1945",
            "maxyearMessage": "La date doit etre antérieure à 2016",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "patternMessage":"Merci de respecter le format : AAAA",
            "hidden": true,
            "binds": [
            {
                "name": "Etape3_Client_BanqueId",
                "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14]
            }],
            "autoChange": true,
            "nextField": true
        }, {
            "name": "Etape3_Client_FICP_FCC",
            "label": "Statut FICP / FCC",
            "group": "V. Votre banque",
            "type": "yesno",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "yesLabel": "Non",
            "noLabel": "Oui",
            "yesValue": "false",
            "noValue": "true",
            "nextField": true,
            "autoChange": true,
            "tooltip": "Vous êtes ou votre conjoint, inscrit au FICP (Fichier des Incidents de Crédits aux Particuliers) ou au FCC (Fichier Central des Chèques) ou avez un dossier de surendettement en cours."
        },
  {
      "name": "Etape1_Client_CiviliteId",
      "label": "Civilité",
      "group": "VI. Faisons connaissance",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": [
           { "id": 1, "label": "Monsieur" },
               { "id": 2, "label": "Madame" },
            { "id": 3, "label": "Mademoiselle" }
      ],
      "nextField": true,
      "autoChange": true,
      "tooltip": "Pour finir, merci de renseigner les informations ci-dessous pour établir votre dossier de prêt."
  },
        {
            "name": "Etape1_Client_Nom",
            "label": "Nom",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true
        },
        {
            "name": "Etape1_Client_NomJeuneFille",
            "label": "Nom de jeune fille",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "hidden": true,
            "binds": [
              {
                  "name": "Etape1_Client_CiviliteId",
                  "values": [2]
              }
            ],
            "nextField": true
        },
        {
            "name": "Etape1_Client_Prenom",
            "label": "Prénom",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true
        },
        {
            "name": "Formulaire_E_Naissance",
            "label": "Date de naissance",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "date",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "autoChange": true,
            "nextField": true

        },
        {
            "name": "Etape1_Client_NaissanceCodePostal",
            "label": "Code Postal de naissance",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "minlength": 5,
            "maxlength": 5,
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true
        },
        {
            "name": "Etape1_Client_NaissanceVille",
            "label": "Ville de naissance",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "minlength": 5,
            "maxlength": 5,
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true
        },
  {
      "name": "CEtape1_Client_CiviliteId",
      "label": "Civilité du conjoint",
      "group": "VI. Faisons connaissance",
      "type": "select",
      "subtype": "select",
      "requireMessage": "Champ obligatoire : merci de le renseigner.",
      "values": [
           { "id": 1, "label": "Monsieur" },
               { "id": 2, "label": "Madame" },
            { "id": 3, "label": "Mademoiselle" }
      ],
      "nextField": true,
      "autoChange": true,
      "coClient": true,
      "tooltip": "Merci de renseigner également les informations ci-dessous concernant votre conjoint."
  },
        {
            "name": "CEtape1_Client_Nom",
            "label": "Nom du conjoint",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true,
            "coClient": true
        },
        {
            "name": "CEtape1_Client_NomJeuneFille",
            "label": "Nom de jeune fille du conjoint",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "hidden": true,
            "binds": [
              {
                  "name": "CEtape1_Client_CiviliteId",
                  "values": [2]
              }
            ],
            "nextField": true,
            "coClient": true
        },
        {
            "name": "CEtape1_Client_Prenom",
            "label": "Prénom du conjoint",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true,
            "coClient": true
        },
        {
            "name": "CFormulaire_E_Naissance",
            "label": "Date de naissance du conjoint",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "date",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true,
            "autoChange": true,
            "coClient": true
        },
        {
            "name": "CEtape1_Client_NaissanceCodePostal",
            "label": "Code Postal de naissance du conjoint",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "minlength": 5,
            "maxlength": 5,
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true,
            "coClient": true
        },
        {
            "name": "CEtape1_Client_NaissanceCodePostal",
            "label": "Ville de naissance du conjoint",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "minlength": 5,
            "maxlength": 5,
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true,
            "coClient": true
        }, {
            "name": "Etape1_Client_Adresse_Rue",
            "label": "Adresse de résidence",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true
        }, {
            "name": "Etape1_Client_Adresse_ComplementAdresse",
            "label": "Complément d'adresse",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true,
            "tooltip": "Si vous n'avez pas de complément d'adresse à nous renseigner, cliquez sur le lien ci-dessous.",
            "skip": true,
            "skipMessage": "Pas de complément d'adresse"
        }, {
            "name": "Etape1_Client_Adresse_CodePostal",
            "label": "Code postal de résidence",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true,
            "tooltip": "Code postal à 5 chiffres.<br /> Si étranger, saisir 99 000."
        }, {
            "name": "Etape1_Client_Adresse_Ville",
            "label": "Ville de résidence",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "text",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "nextField": true
        }, {
            "name": "Etape1_Client_Tel_Mobile",
            "label": "N° de téléphone portable",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "phone",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "patternMessage": "Merci de respecter le format : 10 chiffres",
            "minlengthMessage": "Merci de respecter le format : 10 chiffres",
            "maxlengthMessage": "Merci de respecter le format : 10 chiffres",
            "nextField": true, "autoChange": true,
            "tooltip": "Votre numéro de portable nous permet de vous informer gratuitement et en temps réel de l'avancement de votre demande.<br /> Veuillez renseigner un numéro français commençant par 06 ou par 07."
        }, {
            "name": "Etape1_Client_Tel_Domicile",
            "label": "N° de téléphone fixe",
            "group": "VI. Faisons connaissance",
            "value": "",
            "type": "phone",
            "subtype": "input",
            "requireMessage": "Champ obligatoire : merci de le renseigner.",
            "patternMessage":  "Merci de respecter le format : 10 chiffres",
            "minlengthMessage": "Merci de respecter le format : 10 chiffres",
            "maxlengthMessage": "Merci de respecter le format : 10 chiffres",
            "nextField": true, "autoChange": true,
            "tooltip": "La saisie de votre numéro de téléphone fixe accelerera le traitement de votre demande. <br />Veuillez renseigner un numéro français commençant par 01, 02, 03, 04, 05, 08 ou par 09.<br />Si vous ne possédez pas de ligne fixe, cliquez sur le lien ci-dessous.",
            "skip": true,
            "skipMessage": "Pas de ligne fixe"
        }
        ],
    _fields = {}, prev;
        for (var i = 0, field; field = fields[i]; i++) {
            _fields[field.name] = ProtoFieldFactory(field, field.type);
            if (prev) {
                _fields[field.name]['prev'] = prev;
                prev['next'] = _fields[field.name];
            }
            prev = _fields[field.name];
        }
        function getFields() {
            return _fields
        }
        return {
            'getFields': getFields
        }
    }

    FieldsService.$inject = ['$http', 'ProtoFieldFactory'];
})();
