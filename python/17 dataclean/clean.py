import pandas as pd

def clean_data(file_path):
    df = pd.read_csv(file_path)
    cleaned_df = df.dropna().drop_duplicates() 
    print("Cleaned and Unique Data:")
    print(cleaned_df)

file_path = 'data.csv' 
clean_data(file_path)


