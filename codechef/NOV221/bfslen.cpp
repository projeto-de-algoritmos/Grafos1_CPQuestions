#include <bits/stdc++.h>
using namespace std;
using vi = vector<int>;
using Graph = vi;
using Vertex = int;
const int N = 1e5 + 3;

int dist[N];
Graph g[N];

void bfs(Vertex s, int & count) {
  queue<Vertex> q;
  q.emplace(s);

  while(! q.empty()) {
    Vertex u = q.front(); q.pop();

    for (Vertex v: g[u]) {
      if(dist[v] == -1) {
        dist[v] = dist[u] + 1;
        count += dist[v];
        q.emplace(v);
      }
    }
  }
}

int solve(int m) {
  int u, v;
  int count = 0;
  while(m--) {
    cin >> u >> v;
    g[u].push_back(v);
  }

  dist[1] = 0;
  bfs(1, count);

  return count;
}

// Lembrete: NÃO USAR "endl". Faz flush automático do cout.
int main() {
  //Stream mais veloz (desacolpa de stdio do C)
  iostream::sync_with_stdio(0);
  cin.tie(0);
  int t, n;
  cin >> t;
  while (t--) {
    cin >> n;
    int m = n-1;
    for (int i = 1; i < n + 1; ++i) {
      dist[i] = -1;
      g[i].clear();
    }

    cout << solve(m) << '\n';
  }
  
  return 0;
} 

