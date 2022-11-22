#include <bits/stdc++.h>
#include <bitset>
using namespace std;

queue<int> bfs_stack;
int dists[400][400];

void bfs(vector<vector<int>> adj, int start,
         vector<pair<int, int>> nodes) {
    bfs_stack.push(start);

    while (! bfs_stack.empty()) {
      int next = bfs_stack.front(); bfs_stack.pop(); 
      cout << "Start: " << next << endl;
      for (int son : adj[next]) {
        cout << "Filho: " << son << endl;
        pair<int, int> coords = nodes[son];
        pair<int, int> parent_coords = nodes[next];
        if (dists[coords.first][coords.second] == -1) {
          bfs_stack.push(son);
         
          dists[coords.first][coords.second] =
              dists[parent_coords.first][parent_coords.second] + 1;
        }
      }
    }
}

int main() {
  int N, M;
  cin >> N >> M;

  int A[N + 1][N + 1];
  vector<pair<int, int>> nodes(N * N);
  vector<vector<int>> adj(N * N);

  int node = 0;
  for (int i = 1; i < N + 1; i++)
    for (int j = 1; j < N + 1; j++) {
      A[i][j] = node;
      nodes[node++] = {i, j};
      dists[i][j] = -1;
    }

  for (int i = 1; i < N + 1; i++)
    for (int j = 1; j < N + 1; j++) {
      for (int m = 1; m < N + 1; m++) {
        float l = sqrt((float) (M*M - ((j - m) * (j - m))) ) + i;

        cout << l - (int) l << ' ' << l << ' ';
        if (l - ((int)l) <= 0.1e-10 && l >= 1 && l <= N) {
          cout << "Going to push value for node " << A[i][j] << " coord: " << nodes[A[i][j]].first  << " , "<< nodes[A[i][j]].second << " the node is: " << A[(int)l][m] << " coords: " << (int) l << " , " << m << endl;
          adj[A[i][j]].push_back(A[(int)l][m]);
        }
      }
    }

  dists[1][1] = 0;

  bfs(adj, 0, nodes);

  for (int i = 1; i < N + 1; i++) {
    for (int j = 1; j < N; j++) {
      cout << dists[i][j] << ' ';
    }
    cout << dists[i][N] << endl;
  }

  return 0;
}
