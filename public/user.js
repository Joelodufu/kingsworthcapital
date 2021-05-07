var user = {
    name : 'Peter Edache',
    membership : 'pro',
    wallet: 150000,
    unit:100000,
    withdrawable:25000,
    roi:0.25*unit,
    investments: [
        {
            name:'sbs',
            openingDate: Date.now(),
            clossingDate: opening+30,
            ripe:true,
            withdraw: (closing)=>{
                if (closing = Date.now() ) {
                    withdrawable+=roi
                }
            }
        }
    ]

}