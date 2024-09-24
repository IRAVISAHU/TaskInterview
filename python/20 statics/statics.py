import pandas as pd
import numpy as np

def calculate_statistics(df, column_name):
    mean_val = np.mean(df[column_name])
    median_val = np.median(df[column_name])
    std_val = np.std(df[column_name])
    print(f'Mean {column_name}: {mean_val}')
    print(f'Median {column_name}: {median_val}')
    print(f'Standard Deviation {column_name}: {std_val}')
df = pd.read_csv('data.csv') 
calculate_statistics(df, 'age')
