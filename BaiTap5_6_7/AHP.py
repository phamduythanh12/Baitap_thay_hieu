import numpy as np

A = np.array([
    [1 / 1, 1 / 2, 3 / 1],
    [2 / 1, 1 / 1, 4 / 1],
    [1 / 3, 1 / 4, 1 / 1]
])

num_rows, num_cols = A.shape

# Step 1
sum_col = A.sum(axis=0)

# Step 2
B = np.zeros(shape=(num_rows, num_cols))
for row in range(0, num_rows):
    for col in range(0, num_cols):
        B[row][col] = A[row][col] / sum_col[col]

# Step 3
sum_row = B.sum(axis=1)
sum_all_row = sum_row.sum(axis=0)

# Step 4
W = np.zeros(num_rows)
for row in range(0, num_rows):
    W[row] = sum_row[row] / sum_all_row

# Step 5
V = A.dot(W)

# Step 6
for row in range(0, num_rows):
    V[row] = V[row] / W[row]

# Step 7
lan_da = V.sum(axis=0) / num_rows

# Step 8
CI = (lan_da - num_rows) / (num_rows - 1)

# Step 9
RI = np.array([0, 0, 0.52, 0.89, 1.11, 1.25, 1.35, 1.4,
               1.45, 1.49, 1.52, 1.54, 1.56, 1.58, 1.59])

CR = CI / RI[num_rows]

print(CR)

print(W)
