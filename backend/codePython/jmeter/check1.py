import pandas as pd
import os

# Read data from CSV file
# df = pd.read_csv('./csv_test/Test_5request_10Threads_Ramp-up12_Loop1.csv')
df = pd.read_csv('D:/dtu/jmeter/result1')

# Calculate average response time
average_response_time_ms = df['elapsed'].mean()

# Calculate error rate
error_rate = 1 - (df['success'].sum() / len(df))
error_rate_percentage = error_rate * 100
# Calculate throughput
total_requests = len(df)
total_duration_seconds = (df['timeStamp'].max() - df['timeStamp'].min()) / 1000
throughput = total_requests / total_duration_seconds

# Print the calculated metrics
print("Average Response Time:", average_response_time_ms, "ms")
print("Error Rate:", error_rate_percentage, "%")
print("Throughput:", throughput, "requests/second")