import { useEffect, useState } from 'react'

// Trae en vivo cuántos miembros y cuántos conectados tiene el server.
// Si falla (sin internet, bloqueado, etc.) devuelve null y se usa el respaldo.
export function useDiscord(codigo) {
  const [datos, setDatos] = useState(null)
  useEffect(() => {
    let vivo = true
    fetch(`https://discord.com/api/v9/invites/${codigo}?with_counts=true`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => {
        if (!vivo || !j.approximate_member_count) return
        setDatos({
          miembros: j.approximate_member_count,
          conectados: j.approximate_presence_count,
          nombre: j.guild?.name,
          icono: j.guild?.icon ? `https://cdn.discordapp.com/icons/${j.guild.id}/${j.guild.icon}.png?size=128` : null,
        })
      })
      .catch(() => {})
    return () => {
      vivo = false
    }
  }, [codigo])
  return datos
}
