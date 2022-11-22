def dfs(g: [[]], s: int, visited: [], path: [], count=0) -> int:
    if visited[s] == -1:
        visited[s] = count
        for u in g[s]:
            if visited[u] == -1: path.append(u)
            return dfs(g, u, visited, path, count + 1)
    return visited[s]

def solve(g: [[]], k: int) -> None:
    s = 0
    visited = [-1] * len(g)
    path = [s]
    c = dfs(g, s, visited, path)

    if (k - len(path) - 1 <= 0):
        print(path[k] + 1)
    else:
        print(path[c + ( (k - c) % (len(path) - c) )] + 1)


if __name__ == "__main__":
    n, k = list(map(int, input().split()))
    g = [[] for _ in range(n)]
    A = list(map(int, input().split()))

    for i, a in enumerate(A): g[i].append(a - 1)
    solve(g, k)
