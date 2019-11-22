import { of } from 'rxjs';
import { map } from 'rxjs/operators';
of(1, 2, 3).pipe(map(x => x + 2)).subscribe((data) => console.log(data));
//# sourceMappingURL=hello-world.js.map