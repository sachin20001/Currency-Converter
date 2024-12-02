
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const selects=document.querySelectorAll(".select-container select");
const amount=document.querySelector("#amount");
const msg=document.querySelector("#msg");
const btn=document.querySelector("#btn")



for(select of selects)
{
    
    
    for(code in countryList)
    {
        newOption=document.createElement("option");
        newOption.value=code;
        newOption.innerText=code;

        if(select.id==="from" && code==="USD")
        {
            newOption.selected="selected";
        }
        

        if(select.id==="to" && code==="INR")
        {
            console.log("inside ")
            newOption.selected=true;
        }

        select.appendChild(newOption);
    }

    select.addEventListener("change",(evt) => {
      updateFlag(evt.target);
    })
}


const updateFlag=(ele) => {
  curCode=ele.value;
  let imgURL=`https://flagsapi.com/${countryList[curCode]}/flat/64.png`;
  const img=ele.parentElement.querySelector("img");
  img.src=imgURL;
}

//Function to get the latest exchange rate
const getExchangeRate=async () => {
    let amountVal=amount.value;
    if(amountVal==="" || amountVal<1 )
    {
        amount.value="1";
        amountVal=amount.value;
    }
    let from=selects[0].value.toLowerCase();
    let to=selects[1].value.toLowerCase();
    const url=`${BASE_URL}/${from}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[from][to];
    console.log(rate);
    let finalVal=amountVal*rate;
    msg.innerText=`${amountVal} ${from.toUpperCase()} is ${finalVal} ${to.toUpperCase()}`;
}

//Adding click event to button to fetch latest exchange rate on each click
btn.addEventListener("click",() => {
  getExchangeRate();
})


window.addEventListener("load",() => {
  getExchangeRate();
})





