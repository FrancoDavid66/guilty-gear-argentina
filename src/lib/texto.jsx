// Convierte "texto con **resaltado**" en spans resaltados
export function Resaltar({ texto, className = 'text-cian font-semibold' }) {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith('**') ? (
      <strong key={i} className={className}>
        {parte.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{parte}</span>
    ),
  )
}
