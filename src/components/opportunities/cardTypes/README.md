# Opportunity Type Fields - Modular Structure

Questa struttura modulare consente di gestire diversi tipi di opportunità in modo flessibile e scalabile.

## Struttura dei File

```
src/components/opportunities/
├── cardTypes/
│   ├── index.ts                    # Export centrale per tutti i componenti
│   ├── JobFields.tsx              # Componente per opportunità di lavoro
│   ├── InternshipFields.tsx       # Componente per stage
│   ├── FreelanceFields.tsx        # Componente per lavori freelance
│   ├── ChallengeFields.tsx        # Componente per sfide/challenge
│   ├── BootcampFields.tsx         # Componente per bootcamp
│   ├── ThesisFields.tsx           # Componente per tesi
│   ├── MentorshipFields.tsx       # Componente per mentorship
│   ├── ResearchFields.tsx         # Componente per ricerca
│   └── VolunteeringFields.tsx     # Componente per volontariato
├── OpportunityTypeFields.tsx      # Componente principale
├── OpportunityTypeDemo.tsx        # Componente dimostrativo
└── types.ts                       # Tipi TypeScript

```

## Tipi di Opportunità Supportati

1. **job** - Lavoro a tempo pieno
2. **internship** - Stage/tirocinio
3. **freelance** - Lavoro freelance/progetto
4. **challenge** - Sfide di programmazione
5. **bootcamp** - Programmi di formazione intensiva
6. **thesis** - Tesi di ricerca
7. **mentorship** - Programmi di mentorship
8. **research** - Progetti di ricerca
9. **volunteering** - Opportunità di volontariato

## Come Usare

### Importazione del Componente Principale

```tsx
import OpportunityTypeFields from '@/components/opportunities/OpportunityTypeFields';

// Uso
<OpportunityTypeFields
  opportunity={opportunity}
  onViewDetails={handleViewDetails}
/>;
```

### Aggiungere un Nuovo Tipo di Opportunità

1. **Creare il componente specifico** in `src/components/opportunities/types/`:

```tsx
// NewTypeFields.tsx
import React from 'react';
import { Icon } from 'lucide-react';
import { Opportunity } from '../types';

interface NewTypeFieldsProps {
  opportunity: Opportunity;
}

const NewTypeFields: React.FC<NewTypeFieldsProps> = ({ opportunity }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <Icon className="text-color-600 h-4 w-4" />
      <span className="font-medium">Tipo Specifico</span>
    </div>
    <div className="bg-color-50 rounded-lg p-3">
      <h5 className="text-color-900 mb-1 font-medium">Titolo</h5>
      <p className="text-color-800 text-sm">
        Descrizione specifica per questo tipo.
      </p>
    </div>
  </div>
);

export default NewTypeFields;
```

2. **Aggiornare** `src/components/opportunities/types/index.ts`:

```tsx
export { default as NewTypeFields } from './NewTypeFields';

export type OpportunityType =
  | 'job'
  | 'internship'
  | 'freelance'
  | 'challenge'
  | 'bootcamp'
  | 'thesis'
  | 'mentorship'
  | 'research'
  | 'volunteering'
  | 'newtype'; // Aggiungere qui

// Aggiornare getOpportunityTypeBadge
export const getOpportunityTypeBadge = (opportunityType: OpportunityType) => {
  const typeConfig = {
    // ... altri tipi
    newtype: { label: 'Nuovo Tipo', color: 'bg-color-100 text-color-800' },
  };

  return (
    typeConfig[opportunityType] || {
      label: opportunityType,
      color: 'bg-gray-100 text-gray-800',
    }
  );
};
```

3. **Aggiornare** `src/components/opportunities/types.ts`:

```tsx
opportunity_type_key: 'job' |
  'internship' |
  'freelance' |
  'challenge' |
  'bootcamp' |
  'thesis' |
  'mentorship' |
  'research' |
  'volunteering' |
  'newtype';
```

4. **Aggiornare i filtri** in `src/components/opportunities/OpportunityFilters.tsx`:

```tsx
const opportunityTypeOptions: FilterOption[] = [
  // ... altri filtri
  { value: 'newtype', label: 'Nuovo Tipo' },
];
```

## Caratteristiche

- **Modulare**: Ogni tipo di opportunità ha il proprio componente
- **Estensibile**: Facile aggiungere nuovi tipi
- **Consistente**: Interfaccia comune per tutti i tipi
- **Type-safe**: Completo supporto TypeScript
- **Riutilizzabile**: Componenti comuni e specifici separati

## Componenti Chiave

### OpportunityTypeFields

Il componente principale che orchestrato tutto:

- Gestisce la logica comune (badge, header, footer)
- Renderizza il componente specifico per tipo
- Fornisce l'interfaccia unificata

### CommonFields

Componente che gestisce i campi comuni a tutti i tipi:

- Descrizione
- Posizione
- Note sulla compensazione
- Date di inizio e fine

### Componenti Specifici per Tipo

Ogni tipo ha il proprio componente che mostra informazioni rilevanti:

- Icone specifiche
- Colori tematici
- Informazioni contestuali
- Layout ottimizzato per il tipo

## Vantaggi

1. **Manutenibilità**: Codice organizzato e facile da mantenere
2. **Scalabilità**: Facile aggiungere nuovi tipi senza modificare codice esistente
3. **Riusabilità**: Componenti possono essere usati in diversi contesti
4. **Coerenza**: Design system uniforme ma flessibile
5. **Performance**: Caricamento on-demand dei componenti specifici
