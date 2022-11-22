#include <bits/stdc++.h>
#include <cstddef>

using namespace std;
using vi = vector<int>;
using vii = vector<set<int>>; // Podem ter múltiplas conexões
using Graph = vii;
using Vertex = int;
using AdjList = vi;

const int N = 105;
const int INF = -1;

void can(bool ans){ ans ? cout << "YO" : cout << "NO"; cout << '\n';}

Graph city(N);
bitset<N> visited(false);
//bitset<N> isolated(false);
vector<set<Vertex>> paths;

void dfs(Graph g, Vertex s, set<Vertex> & path) {
  if (!visited[s]) {
    visited[s] = true;
    path.insert(s);

    for(Vertex u : g[s]) {
      if(!visited[u]) dfs(g, u, path);
    }
  }
}

/**
void mark_isolated(int g_size) {
  for (int i =0; i < g_size; i++) {
    if( city[i].size() <= 0) {
      isolated[i] = true;
      city.erase(city.begin() + i - 1);
    }
  }
}
*/

void check(int x, int y) {
  if (x == y) {
    can(true);
    return;
  }
  else if(city[x].size() <= 0 || city[y].size() <= 0) {
    // cout << "x: " << city[x].size() << " y: " << city[y].size() << '\n';
    can(false);
    return;
  } 
  
  bool ans = false;

  for(int i = 0; i < paths.size(); ++i) {
    if (paths[i].find(x) != paths[i].end() &&
        paths[i].find(y) != paths[i].end())
    {
      ans = true;
      break;
    }
  }

  can(ans);

}

/**
 * alimentar se é alcançável com somente uma travessia
 */
void solve() {
  size_t siz = city.size();
  for(int i = 0; i < siz; ++i) {
    if (!visited[i]) {
      set<Vertex> path;
      dfs(city, i, path);
      if(! path.empty()) paths.push_back(path);
    }
  }
}

// Lembrete: NÃO USAR "endl". Faz flush automático do cout.
int main() {
  //Stream mais veloz (desacolpa de stdio do C)
  iostream::sync_with_stdio(false);
  //Permite cin e cout dessincronizados 
  // sem flush automático
  // Problema não precisa de sincronia pois só faz check dos resultados após
  // a finalização do programa.
  cin.tie(NULL);
  
  int t, n, m, q, a, b, x, y;
  cin >> t;

  while (t--) {
    cin >> n >> m;
    int ne = m;

    while(ne--) {
      cin >> a >> b;
      if (a != b) {
        city[a].insert(b);
        city[b].insert(a);
      }
    }

    cin >> q;

//    mark_isolated(n);

    solve();

    while(q--) {
      cin >> x >> y;
      check(x, y);
    }
  }

  return 0;
} 
