import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { getSwapi, SwapiItemBase, SwapiUrlDetails } from "./helpers/swapi"

export interface Person extends SwapiItemBase {
  name: string
  gender: string
  birth_year: string
  height: number
  mass: number
  eye_color: string
  hair_color: string
  skin_color: string

  homeworld: SwapiUrlDetails
  species: SwapiUrlDetails[]
  starships: SwapiUrlDetails[]
  vehicles: SwapiUrlDetails[]
  films: SwapiUrlDetails[]
}

export async function getPersonDetails(personId: number): Promise<Person> {
  const person = await getSwapi<Person>(`/people/${personId}`)

  return person
}

export async function getPersonList(): Promise<Person[]> {
  const person = await getSwapi<Person[]>("/people")

  return person
}

export function usePersonDetails(personId: number): UseQueryResult<Person> {
  return useQuery({
    queryKey: ["person", personId],
    queryFn: () => getPersonDetails(personId),
  })
}

export function usePersonList(): UseQueryResult<Person[]> {
  return useQuery({
    queryKey: ["people"],
    queryFn: () => getPersonList(),
  })
}
