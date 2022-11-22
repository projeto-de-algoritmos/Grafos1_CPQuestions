#include <bits/stdc++.h>
using namespace std;
using vi = vector<int>;
using Graph = vi;
using Vertex = int;

const int N = 105;

Graph city[N];
vi component(N, -1);

void can(bool ans){ 
  ans ? cout << "YO" : cout << "NO"; cout << '\n';
}

void dfs(Vertex s, int conj) {
  if (component[s] == -1) {
    component[s] = conj;

    for(Vertex u : city[s]) {
      dfs(u, conj);
    }
  }
}

void check(int x, int y) {
  can(component[x] == component[y]);
}

void solve(int n) {
  int conj = 1;
  for(int i = 0; i < n; ++i) {
    if (component[i] == -1) {
      dfs(i, conj++);
    }
  }
}

// Lembrete: NÃO USAR "endl". Faz flush automático do cout.
int main() {
  //Stream mais veloz (desacolpa de stdio do C)
  iostream::sync_with_stdio(0);
  cin.tie(0);
  
  int t, n, m, q, a, b, x, y;
  cin >> t;

  while (t--) {
    cin >> n >> m;
    for(int i = 0; i < n; ++i) {
      city[i].clear();
      component[i] =  -1;
    }

    while(m--) {
      cin >> a >> b;

      city[a].push_back(b);
      city[b].push_back(a);
    }

    cin >> q;
    solve(n);

    while(q--) {
      cin >> x >> y;
      check(x, y);
    }
  }
  return 0;
} 

