import { http, HttpHandler, HttpResponse } from 'msw'
import mtgCardsJson from './json/mtg-cards.json'
import lorcanaCardsJson from './json/lorcana-cards.json'

export const handlers: HttpHandler[] = [
  http.get('https://cardnexus-hiring-docs.s3.eu-west-1.amazonaws.com/mtg-cards.json', () => {
    return HttpResponse.json(mtgCardsJson)
  }),
  http.get('https://cardnexus-hiring-docs.s3.eu-west-1.amazonaws.com/lorcana-cards.json', () => {
    return HttpResponse.json(lorcanaCardsJson)
  }),
]
