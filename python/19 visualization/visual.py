import pandas as pd
import matplotlib.pyplot as plt
def plot_age_distribution(df):
    age_counts = df['age'].value_counts()  
    age_counts.sort_index().plot(kind='line', color='red')
    plt.xlabel('Age')
    plt.ylabel('Number of Users')
    plt.title('User Age Distribution')
    plt.show()
df = pd.read_csv('data.csv')  
plot_age_distribution(df)
