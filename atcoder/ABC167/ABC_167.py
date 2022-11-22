n, k = list(map(int, input().split()))
A = list(map(lambda x: int(x) - 1, input().split()))

s = 0
c = -1
cyc = -1
before = 0
visited = [-1] * n 
path = []

for _ in range(k):
    if visited[s] == -1:
        c += 1
        visited[s] = c
        path.append(s)
        s = A[s]
    else:
       cyc = visited[s] 
       break

#print(path)
#print(path[cyc])

if cyc == -1: print(s + 1)
else: 
    sc = len(path[cyc:])
    k = k - cyc
    k = k % sc
    k += cyc
    print(path[k] + 1)