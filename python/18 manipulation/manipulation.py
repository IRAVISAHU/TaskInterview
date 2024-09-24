import pandas as pd
def get_top_rows(df, column_name, threshold):
    filtered_df = df[df[column_name] > threshold]
    return filtered_df.head(5)
df = pd.read_csv('data.csv') 
top_rows = get_top_rows(df, 'age', 30)
print(top_rows)
