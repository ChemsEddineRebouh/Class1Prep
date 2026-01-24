export interface InspectionItem {
  id: string;
  part: string; // ex: "Système de freinage"
  minor: string[];
  major: string[];
}

export const safetyData: InspectionItem[] = [
  {
    id: '1',
    part: 'Système de freinage (Pneumatique)',
    minor: ['Fuite d\'air audible'],
    major: ['Chute de pression > 28 kPa (1 min)', 'Compresseur ne monte pas la pression', 'Frein de stationnement inefficace']
  },
  {
    id: '2',
    part: 'Roues et Pneus',
    minor: ['Pression basse (non à plat)', 'Valve endommagée'],
    major: ['Pneu à plat ou crevé', 'Fixation manquante ou fissurée', 'Chape décollée']
  },
  {
    id: '3',
    part: 'Attelage (Sellette)',
    minor: [],
    major: ['Jeu excessif dans la sellette', 'Mécanisme de verrouillage ouvert ou défectueux', 'Pivot d\'attelage fissuré']
  },
  {
    id: '4',
    part: 'Feux et Signalisation',
    minor: ['Un feu de position brûlé'],
    major: ['Feux de freinage ne fonctionnent pas', 'Feux de croisement (soir/nuit) éteints']
  }
];