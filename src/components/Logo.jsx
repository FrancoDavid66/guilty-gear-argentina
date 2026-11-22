import { logoUrl } from '../lib/logo'
import { t } from '../i18n'

// Logo del team. Mientras no esté el PNG en src/assets/logo/ muestra uno provisorio.
export default function Logo({ className = '', alt = t('Logo de Guilty Gear Argentina') }) {
  if (logoUrl) return <img src={logoUrl} alt={alt} className={`object-contain ${className}`} draggable="false" />
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={alt}>
      <defs>
        <radialGradient id="lg-fondo" cx="50%" cy="35%" r="70%">
          <stop offset="0" stopColor="#194E81" />
          <stop offset="1" stopColor="#0E131A" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#lg-fondo)" stroke="#02BEFE" strokeWidth="5" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="#02BEFE" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 6" />
      <g transform="skewX(-12) translate(22 0)">
        <text x="100" y="122" textAnchor="middle" fontFamily="'Saira Condensed', Impact, sans-serif" fontWeight="900" fontSize="96" letterSpacing="-6" fill="#02BEFE" stroke="#07090D" strokeWidth="3" paintOrder="stroke">
          GG
        </text>
      </g>
      <text x="100" y="152" textAnchor="middle" fontFamily="'Saira Condensed', Impact, sans-serif" fontWeight="800" fontSize="19" letterSpacing="5" fill="#F8F8F8">
        ARGENTINA
      </text>
    </svg>
  )
}
