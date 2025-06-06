import { Component } from '@angular/core';

@Component({
  selector: 'app-page-familiarization-periode',
  templateUrl: './page-familiarization-periode.component.html',
  styleUrl: './page-familiarization-periode.component.css',
})
export class PageFamiliarizationPeriodeComponent {
  currentStep: number = 0;

  // Définition des étapes
  steps = [
    {
      title: 'Le premier accueil',
      description: `Le premier accueil de l'enfant s'effectue souvent lors de l'admission, de la première visite (présentation du personnel et de la structure) ou de l'inscription (dans le cas où les parents viennent inscrire leur enfant en sa présence). Ce temps d’échange avec la directrice est nécessaire pour expliquer le fonctionnement de la structure mais aussi les valeurs portées par l’équipe au travers de différents projets. C’est également un temps primordial et capital pour répondre aux questionnements et aux inquiétudes de la famille. Lors de cette rencontre, il sera défini ensemble la « période de familiarisation » de l’enfant.\n
                    \nPour les parents, cette période va leur permettre de découvrir l’établissement et les professionnels. Ces temps d’échanges privilégiés seront l’occasion également d’exprimer leurs craintes, leurs questions et/ou de revenir sur certains sujets non évoqués le premier jour. La période de familiarisation pourra se prolonger dans le temps si une famille en ressent le besoin ou encore si l’équipe observe des difficultés à la séparation.\n
                    \nUne organisation souple en lien avec les disponibilités de la famille et évolutive en fonction des observations de la personne référente. Un système de référence qui permettra de créer un lien de confiance avec les familles et l’enfant et de développer une figure d’attachement secondaire.`,
    },
    {
      title: 'L’organisation « type » d’une période de familiarisation',
      description: `Jour 1 : L'enfant est accueilli pour 1h en présence d'une personne qu'il connaît bien (de préférence l'un de ses parents afin qu'il se sente sécurisé au maximum). Le référent échange avec le parent dans la pièce de jeu afin de connaître davantage l'enfant. Une fiche sur les habitudes de vie est rédigée au cours de ce partage d’informations. Ces renseignements sont précieux pour l’équipe car ils permettent de répondre au mieux aux besoins de l’enfant (sommeil, alimentation, développement psychomoteur, éveil). Ainsi, nous pouvons respecter un rythme et des habitudes de vie proches de celles de la maison.\n
                    \nJour 2 : Le parent accompagne son enfant et, dès qu'ils se sentent prêt, une courte séparation est effectuée. Le référent accueille l’enfant en verbalisant ce qu’il est en train de vivre. Puis petit à petit, il va pouvoir, grâce au soutien de sa référente, se détacher de son parent pour explorer l’espace, trouver ses repères et découvrir sa place au sein du groupe.\n
                    \nJour 3 : Une activité est proposée à l’enfant et son parent afin de tisser des liens avec sa référente. Ce climat de confiance est nécessaire à l’évolution de l’accueil pour favoriser l’harmonie et l’épanouissement de l’enfant au sein du groupe.\n
                    \nJour 4 : L'enfant est accueilli au sein de la micro-crèche sur un temps incluant un repas. Au fil du temps, l’enfant prend confiance en lui et en son environnement.\n
                    \nJour 5 : L'enfant est accueilli pour une courte journée incluant le repas et la sieste. La séparation et l’accueil du matin se font plus sereinement. C’est alors que d’autres professionnelles peuvent intervenir pour un accompagnement au quotidien.\n
                    \nLors de la période de familiarisation, l'ensemble de l'équipe est attentive aux réactions et émotions de l’enfant. Elle accueille ce qu’il exprime et l’accompagne progressivement afin qu'il puisse faire doucement connaissance avec son entourage à venir.\n
                    \nL’équipe entière bénéficie de temps d’échanges durant lesquels la référente partage ses connaissances de l’enfant et de sa famille. C’est grâce à ces échanges que progressivement toute l’équipe sera amenée à pouvoir accueillir l’enfant dans le respect de ce qui a été transmis par la famille, créant ainsi une harmonie des pratiques autour de l’enfant et en coéducation avec ses parents.`,
    },
    { title: 'La personne référente', description: 'Adaptation complète' },
  ];

  // Naviguer vers l'étape suivante
  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  // Naviguer vers l'étape précédente
  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Aller à une étape spécifique
  goToStep(step: number) {
    this.currentStep = step;
  }
}
