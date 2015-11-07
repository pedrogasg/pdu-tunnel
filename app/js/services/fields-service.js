(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.service('FieldsService', FieldsService);

    function FieldsService(ProtoFieldFactory) {
        var sectors = [{ 'id': 1, 'label': "Salarié du secteur privé" },  { 'id': 2, 'label': "Salarié du secteur public" }, { 'id': 3, 'label': "Secteur agricole" }, { 'id': 11, 'label': "Indépendant / Travailleurs non salariés" }, { 'id': 6, 'label': "Retraité" }, { 'id': 10, 'label': "Autres" }],
            professions = [{ 'id': 1, "IdSecteur": 1, 'label': "Cadre supérieur", "ContratTravail": true, "DateDebut": true }, { 'id': 2, "IdSecteur": 1, 'label': "Ingénieur", "ContratTravail": true, "DateDebut": true }, { 'id': 3, "IdSecteur": 1, 'label': "Cadre moyen", "ContratTravail": true, "DateDebut": true }, { 'id': 4, "IdSecteur": 1, 'label': "Technicien", "ContratTravail": true, "DateDebut": true }, { 'id': 5, "IdSecteur": 1, 'label': "Contremaître - Agent de maîtrise", "ContratTravail": true, "DateDebut": true }, { 'id': 6, "IdSecteur": 1, 'label': "Agent de sécurité", "ContratTravail": true, "DateDebut": true }, { 'id': 7, "IdSecteur": 1, 'label': "Employé de commerce", "ContratTravail": true, "DateDebut": true }, { 'id': 8, "IdSecteur": 1, 'label': "Assistante maternelle - Employée de maison", "ContratTravail": true, "DateDebut": true }, { 'id': 9, "IdSecteur": 1, 'label': "Employé de bureau", "ContratTravail": true, "DateDebut": true }, { 'id': 10, "IdSecteur": 1, 'label': "Vendeur - Caissier de magasin", "ContratTravail": true, "DateDebut": true }, { 'id': 11, "IdSecteur": 1, 'label': "Ouvrier", "ContratTravail": true, "DateDebut": true }, { 'id': 12, "IdSecteur": 1, 'label': "Représentant salarié", "ContratTravail": true, "DateDebut": true }, { 'id': 13, "IdSecteur": 1, 'label': "Chauffeur et livreur", "ContratTravail": true, "DateDebut": true }, { 'id': 14, "IdSecteur": 2, 'label': "Cadre supérieur et professeur", "ContratTravail": true, "DateDebut": true }, { 'id': 15, "IdSecteur": 2, 'label': "Cadre moyen et instituteur", "ContratTravail": true, "DateDebut": true }, { 'id': 16, "IdSecteur": 2, 'label': "Infirmière et profession para-médicale", "ContratTravail": true, "DateDebut": true }, { 'id': 17, "IdSecteur": 2, 'label': "Employé et agent administratif", "ContratTravail": true, "DateDebut": true }, { 'id': 18, "IdSecteur": 2, 'label': "Agent de service", "ContratTravail": true, "DateDebut": true }, { 'id': 19, "IdSecteur": 2, 'label': "Ouvrier d'état", "ContratTravail": true, "DateDebut": true }, { 'id': 20, "IdSecteur": 2, 'label': "Militaire - Gendarme - Policier - Pompier", "ContratTravail": true, "DateDebut": true }, { 'id': 21, "IdSecteur": 2, 'label': "Aide soignant hospitalier", "ContratTravail": true, "DateDebut": true }, { 'id': 22, "IdSecteur": 3, 'label': "Propriétaire agricole", "ContratTravail": false, "DateDebut": true }, { 'id': 23, "IdSecteur": 3, 'label': "Salarié agricole", "ContratTravail": true, "DateDebut": true }, { 'id': 24, "IdSecteur": 11, 'label': "Commerçant", "ContratTravail": false, "DateDebut": true }, { 'id': 25, "IdSecteur": 11, 'label': "Artisan", "ContratTravail": false, "DateDebut": true }, { 'id': 26, "IdSecteur": 11, 'label': "Profession libérale", "ContratTravail": false, "DateDebut": true }, { 'id': 27, "IdSecteur": 11, 'label': "VRP sans fixe", "ContratTravail": false, "DateDebut": true }, { 'id': 28, "IdSecteur": 11, 'label': "Infirmière et cadre moyen du secteur médical", "ContratTravail": false, "DateDebut": true }, { 'id': 29, "IdSecteur": 11, 'label': "Profession libérale médicale et para-médicale", "ContratTravail": false, "DateDebut": true }, { 'id': 30, "IdSecteur": 10, 'label': "Etudiant", "ContratTravail": false, "DateDebut": false }, { 'id': 31, "IdSecteur": 6, 'label': "Retraité du secteur privé", "ContratTravail": false, "DateDebut": true }, { 'id': 32, "IdSecteur": 6, 'label': "Retraité du secteur public", "ContratTravail": false, "DateDebut": true }, { 'id': 33, "IdSecteur": 10, 'label': "Demandeur d'emploi", "ContratTravail": false, "DateDebut": false }, { 'id': 34, "IdSecteur": 10, 'label': "Pensionné", "ContratTravail": false, "DateDebut": false }, { 'id': 35, "IdSecteur": 10, 'label': "Sans profession - Sans emploi", "ContratTravail": false, "DateDebut": false }, { 'id': 36, "IdSecteur": 11, 'label': "Intermittent / Professionnel du spectacle", "ContratTravail": false, "DateDebut": false }, { 'id': 37, "IdSecteur": 11, 'label': "Autoentrepreneur", "ContratTravail": false, "DateDebut": true }, { 'id': 38, "IdSecteur": 11, 'label': "Chef d’entreprise de 5 salariés ou +", "ContratTravail": false, "DateDebut": true }]
            fields = [
            {
                'name': 'first',
                'label': 'First',
                'group':'LittleNumbers',
                'value': '',
                'type': 'text',
                'minlength': 4,
                'maxlength': 5,
                'requireMessage': 'This first field is required',
                'minlengthMessage': '4 letters word minimun',
                'maxlengthMessage': '5 letters word maximum',
                'nextField': 'money',
                'tooltip': '<em>Html stuff</em><br /><strong>Hard stuff</strong>'
            },
            {
                'name': 'money',
                'label': 'Money',
                'group': 'CoolKids',
                'value': '',
                'type': 'money',
                'minvalue': 1,
                'maxvalue': 5000,
                'requireMessage': 'The money field is mandatory',
                'minvalueMessage': 'The value entered is less than the minimal value',
                'maxvalueMessage': 'The value entered is superiur than the maximal value',
                'parseMessage': 'The input need to have a numeric format',
                'nextField': 'yesornot',
                'tooltip': '<em>Html stuff</em><br /><strong>Hard stuff</strong>'
            }, {
                'name': 'yesornot',
                'label': 'Yes or Not',
                'group': 'CoolKids',
                'value': 'yes',
                'type': 'yesno',
                'requireMessage': 'This Yes or Not field is required',
                'nextField': 'second',
                'yesLabel': 'Yes',
                'noLabel': 'No',
                'yesValue': 'yes',
                'noValue': 'no',
                'autoChange': true,
                'tooltip': '<em>Html stuff</em><br /><strong>Hard stuff</strong>'
            },
            {
                'name': 'second',
                'label': 'Second',
                'group': 'LittleNumbers',
                'value': '',
                'type': 'number',
                'minvalue': 0,
                'maxvalue': 9,
                'requireMessage': 'This second field is required',
                'minvalueMessage': 'The value entered is less than the minimal value',
                'maxvalueMessage': 'The value entered is superiur than the maximal value',
                'numberMessage': 'The input must be a Number',
                'nextField': 'third',
                'tooltip': '<em>Html stuff</em><br /><strong>Hard stuff</strong>'
            },
            {
                'name': 'third',
                'label': 'Third',
                'group': 'LittleNumbers',
                'value': '',
                'type': 'month',
                'minyear': 1945,
                'maxyear':2010,
                'requireMessage': 'This third field is required',
                'parseMessage': 'The date must have MM/YYYY as format',
                'minyearMessage': 'The date must be superior to 1945',
                'maxyearMessage': 'The date must be inferior to 2010',
                'hidden': true,
                'binds': [{
                    'name': 'first',
                    'values': [
                        'third',
                        'show'
                    ]
                },
                {
                    'name': 'second',
                    'regexp': '[0-9]'
                }],
                'nextField': 'fourth',
                'autoChange':true,
                'tooltip': '<em>Html stuff</em><br /><strong>Hard stuff</strong>'
            },
            {
                'name': 'fourth',
                'label': 'Fourth',
                'group': 'BigNumbers',
                'value': '',
                'values': sectors,
                'type': 'select',
                'requireMessage': 'This fourth field is required',
                'hidden': true,
                'binds': [{
                    'name': 'third',
                    'values': [
                        '01/2009',
                    ]
                }],
                'filters': {
                    'fith': 'IdSecteur'
                },
                'nextField': 'fith',
                'autoChange': true,
                'tooltip': '<em>Html stuff</em><br /><strong>Hard stuff</strong>'
            },
            {
                'name': 'fith',
                'label': 'Fith',
                'group': 'BigNumbers',
                'value': '',
                'values': professions,
                'type': 'select',
                'requireMessage': 'This fith field is required',
                'hidden': true,
                'binds': [{
                    'name': 'fourth',
                    'values': [
                        '*'
                    ]
                }],
                'tooltip':'<em>Html stuff</em><br /><strong>Hard stuff</strong>'
            }

        ],
        _fields = {};
        for (var i = 0, field; field = fields[i]; i++) {
            _fields[field.name] = ProtoFieldFactory(field, field.type);
        }
        function getFields() {
            return _fields
        }
        return {
            'getFields': getFields
        }
    }

    FieldsService.$inject = ['ProtoFieldFactory'];
})()