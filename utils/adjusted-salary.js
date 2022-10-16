import {personalAllowance, basicRateCap, basicTaxRate, higherRateCap, higherTaxRate,
    additionalTaxRate, standardNationalInsurance, additionalNationalInsurance} from '../taxation.js'

export default (salary, ReloactionCostPerMonth) => {
    let actual = 0
    if (salary > higherRateCap){actual += (salary-higherRateCap)*(1-additionalTaxRate)}
    if (salary > basicRateCap)
    {actual += salary > higherRateCap ?
        (higherRateCap-basicRateCap)*(1-higherTaxRate) : (salary-basicRateCap)*(1-higherTaxRate)}
    if (salary > personalAllowance)
    {actual += salary > basicRateCap ? (basicRateCap-personalAllowance)*(1-basicTaxRate) : (salary-personalAllowance)*(1-basicTaxRate)}
    actual += salary > personalAllowance ? personalAllowance : salary
    if (salary > basicRateCap)
    {actual -= (salary-basicRateCap)*additionalNationalInsurance}
    if (salary > personalAllowance)
    {actual -= salary > basicRateCap ? (salary - basicRateCap - personalAllowance)*standardNationalInsurance :
        (salary - personalAllowance)*standardNationalInsurance}
    return Math.round((actual - (ReloactionCostPerMonth * 12)),2)}
