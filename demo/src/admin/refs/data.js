import { randomId } from './DataTree'

function assignIds(children){
  children.forEach(c => {
    if (!c.id) c.id = randomId()
    if (c.children) assignIds(c.children)
  })
  return children
}

export default {
  localisations: {
    table: "localisations",
    label: "Localisations",
    isTree: false,
    children: assignIds([
      {label: "Archives Départementales de la Somme"},
      {label: "L'Ardennais"},
      {label: "Bibliothèque Nationale de France"},
      {label: "Bibliothèques d'Amiens-Métropole"}
    ])
  },
  supports: {
    table: "supports",
    label: "Supports",
    isTree: true,
    children: assignIds([
      {label: "image"},
      {label: "texte"},
      {label: "audio"},
      {label: "film"},
      {label: "vidéo"},
    ])
  },
  doctypes: {
    table: "doctypes",
    label: "Types de documents",
    isTree: true,
    children: assignIds([
      {label: "image", children: [
        {label: "affiche"},
        {label: "album", children: [
          {label: "album-photo"},
          {label: "livre d'or"},
        ]},
        {label: "autre"},
        {label: "calendrier"},
        {label: "carte postale", children: [
          {label: "publicitaire"},
          {label: "de correspondance"},
        ]},
        {label: "collage"},
        {label: "dessin"},
        {label: "gravure, estampe"},
        {label: "pannel(s) d'exposition"},
        {label: "peinture"},
        {label: "photographie", children: [
          {label: "couleur"},
          {label: "noir et blanc"},
          {label: "sépia"},
        ]},
        {label: "plan", children: [
          {label: "plan de ville"},
          {label: "plan d'architecture"},
          {label: "plan d'implantation des décors"},
          {label: "plan de feux"},
        ]},
        {label: "tract"},
      ]},
      {label: "texte", children: [
        {label: "article"},
        {label: "autre"},
        {label: "cahier de mise en scène"},
        {label: "correspondance"},
        {label: "document administratif", children: [
          {label: "supplique"},
          {label: "statuts"},
          {label: "facture"},
          {label: "contrat"},
          {label: "procès-verbal, minute de police"},
        ]},
      ]}
    ])
  }
}