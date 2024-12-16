# Informations importantes

## Badges et récompenses

### Différentes fonctionnalités:

- Baby Owl = le bouton créer un quiz est visible et la page de création de quiz est accessible (1000 xp)
- Fledgling = le type de question ''Find the intruder'' est disponible/visible (5000xp)
- Owl Master = le type de question ''Identify the sound'' est disponible / visible (10000xp)

### Comment les accumuler:

- En jouant à des quiz. Le score calculé en pourcentage donne de l’XP. Exemples: un score de 0% donne 0 XP,un score de 50% donne 150 XP, un score de 100% donne 300 XP, etc.

### Pour tester:

- Dans la table `profile`, il y a une colonne `xp` qui commence à 0, vous pouvez modifier le votre, **MAIS** il faut aussi jouer à au moins 1 quiz pour que le insert dans la table `profiles_badges` (nécessaire pour voir les fonctionnalités) se fasse.
- Pour retirer les badges, il faut modifier le `xp` dans `profiles` **ET** effacer de la table `profiles_badges` les badges associé à votre user id

## Administration

### Pour devenir administrateur, voici les étapes :

- Accédez à la table `profiles` et modifiez votre rôle dans la colonne `role`.
- Une fois votre rôle mis à jour, un nouveau bouton Admin apparaîtra dans la navigation principale.
- En tant qu’administrateur, vous pourrez gérer les rôles des autres utilisateurs directement depuis la page d’administration.
