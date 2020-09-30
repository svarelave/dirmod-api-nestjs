import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getPrices(body){
    let requests =  []
    body?.coins?.forEach(element => {
      requests.push(axios.post('https://api.cambio.today/v1/quotes/'+body.coinBase+'/'+element+'/json?key=5021|cCKue4FPKAPuzyR2OkmSSsSPxRfSeBDW'))
    });
    return await axios.all(requests).then(axios.spread((...responses) => {
      const values = responses.map(element => {
        if(element.data.status == 'OK'){
          return element.data.result
        }
      })
      return values
    })).catch(errors => {
      return errors
    })
  }
}
