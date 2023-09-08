const express = require('express');
const axios = require('axios')
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Currency Api'); 
});

app.post('/convert', async (req, res) => {
    try {
        let toConvert = req.body.toConvert;
        let conversion = [];
        await Promise.all(
            toConvert.map(async (money) => {
            let amount = money.amount;
            let from = money.from.toLowerCase();
            let to = money.to;
        
            await Promise.all(
                to.map(async (currencyB) => {
                    let btype = currencyB.toLowerCase();
                    try {
                        const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${btype}.json`);
                        let mulFactor = response.data;
                        let answer = amount * mulFactor[btype];
                        const result = {
                            "amount": amount,
                            "from": from,
                            exchangeValues: {
                                to: btype,
                                value: answer
                            }
                        };
                        conversion.push(result);
                    } catch (err) {
                        console.log(err);
                    }
                })
            );
        
        })
        ).then( () => {
            console.log(conversion);
            res.json(conversion);
        }).catch( (err)=>{
            console.log(err);
        })

      } catch (error) {
        console.error(error);
      }


});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
