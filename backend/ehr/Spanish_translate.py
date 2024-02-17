from googletrans import Translator, LANGUAGES
translator = Translator()
# Sample output text from response1
translation =translator.translate(""" Patient Information

Name: Mr. SHORYA DWIVEDI
Age/Sex: 16 years/Male
Referred By: Dr. Aviral Shailesh (D.M.Pulmonary Medicine)
Mobile: 6263808020
Organization: Sodani Diagnostic (Vijay Nagar)
Sample Information

Registered: 26 Oct, 2023, 08:18 p.m.
Collected On: 26 Oct, 2023, 09:16 p.m.
Approved On: 26 Oct, 2023, 09:49 p.m.
Sample Id: 422102315803
Test Description

TSH (4th Generation)
Method: Atelica/Chemiluminescence
Result: 2.04 uIU/mL
Reference Range: 0.35 - 5.5 uIU/mL
Interpretation & Limitation

Elevated levels of T3 & T4 suppress the production of TSH via negative feedback mechanism. In primary hypothyroidism, T3 & T4 levels are low and TSH levels are elevated. Primary hyperthyroidism (Grave’s disease, thyroid adenoma, nodular goiter) is associated with high levels of thyroid hormones and depressed or undetectable TSH.
The result should be used in conjunction with clinical impression and results of other thyroid tests.
Isolated high TSH especially in the range of 5 to 15 uIU/ml is commonly associated with physiological and biological variability and in recovery phase after non thyroid illness.
Isolated Low TSH – especially in the range of 0.1 to 0.3 often seen in elderly & associated with Non – Thyoidal illness.Performance of this assay has not been established with neonates.
Specimens from the patients who have received preparations of mouse monoclonal antibodies may contain human anti mouse antibody (HAMA), such specimen may show falsely elevated or depressed results. Pregnancy reference range source: Guidelines of American Thyroid Association during Pregnancy and postpartum,2011.
TSH is said to show a diurnal variation with a peak after midnight and nadir in the late afternoon. The variation in TSH is such that the peak value can be double the value at the nadir. The values of TSH can vary by 20% in between measurements without any changes in the thyroid status.
Associated Test

Free T3 (Triiodothyronine) and Free T4 (Thyroxine) Tests: These tests measure the actual levels of thyroid hormones circulating in the blood and are often used in conjunction with TSH to assess thyroid function more comprehensively.""", dest="es")
 
print(f"{translation.text}")
print("\n\n*************\n\n")