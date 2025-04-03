import { useFetch } from '#app'

interface CountryResponse {
  name: { common: string }
  cca2: string
  idd: {
    root: string
    suffixes: string[]
  }
}

export const useCountryData = async () => {
  const { data, status, error } = await useFetch<CountryResponse[]>(
    'https://restcountries.com/v3.1/all?fields=name,cca2,idd'
  )

  const countries = computed(() => {
    if (!data.value) return []

    return data.value.map((c) => ({
      label: c.name.common,
      value: c.cca2.toLowerCase(),
      dialCode: `${c.idd?.root || ''}${c.idd?.suffixes?.[0] || ''}`
    })).sort((a, b) => a.label.localeCompare(b.label))
  })

  return {
    countries,
    status,
    error
  }
}
